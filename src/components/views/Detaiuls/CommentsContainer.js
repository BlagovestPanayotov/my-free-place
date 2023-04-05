import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { object, string } from 'yup';
import { UserContext } from '../../../contexts/UserContext';
import { getComments, postComment } from '../../../services/data';
import CommentCart from './CommentCart';

import styles from './Details.module.css';


function CommentsContainer() {

    const { user } = useContext(UserContext);
    const { destinationId } = useParams();

    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [countComments, setCountComments] = useState(0);
    const [pageComments, setPageComments] = useState(1);
    const [postButtonsLoading, setPostButtonLoading] = useState(false);

    const maxPage = Math.ceil(countComments / 3);
    const skip = (page) => page <= 0 ? 0 : (page - 1) * 3;

    useEffect(() => {
        setLoading(true);
        getComments(skip(pageComments), destinationId)
            .then(dataComments => {
                setComments(dataComments.results);
                setCountComments(dataComments.count);
                setLoading(false);
                if (pageComments <= 0) { setPageComments(1); }
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                throw err;
            });
    }, [destinationId, pageComments, countComments]);

    const defaultValues = {
        content: ''
    };

    const schema = object({
        content: string().min(3, 'The content must contain at least 3 characters!').max(50, 'The content can be maximum 50 cahracter!')
    }).required();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues,
        resolver: yupResolver(schema)
    });

    function onSubmit(data) {
        setPostButtonLoading(true);
        postComment(data, user, destinationId)
            .then(result => {
                const newComment = {
                    content: data.content,
                    destination: { __type: 'Pointer', className: 'Destination', objectId: destinationId },
                    owner: { __type: 'Pointer', className: '_User', objectId: user.objectId },
                    objectId: result.objectId
                };
                setComments(state => [newComment, ...state]);
                setCountComments(c => c + 1);
                setPageComments(p => p);
                setPostButtonLoading(false);
                reset();
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    }
    return (
        <div id={styles.comments}>
            <h4>Comments:</h4>

            <form id={styles.postComentForm} onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor='content' id={styles.labelComentForm}>Write Comment</label>
                <textarea {...register('content')}></textarea>
                <p id={styles.errorP}>{errors.content?.message}</p>
                <button type='submiut' id={styles.btnComentForm} disabled={postButtonsLoading}>Post Comment</button>
            </form>
            {loading
                ? <div>Please wait...</div>
                : <>
                    <div id={styles.commentCardsContainer}>
                        {comments?.length > 0 ?
                            comments.slice(0, 3).map(c =>
                                <CommentCart
                                    key={c.objectId}
                                    setComments={setComments}
                                    setCountComments={setCountComments}
                                    setPageComments={setPageComments}
                                    countComments={countComments}
                                    pageComments={pageComments}
                                    reset={reset}
                                    {...c}>
                                </CommentCart>)
                            : <h3>No comments yet</h3>
                        }
                    </div>
                </>
            }
            <div id={styles.pagin}>
                {countComments > 3
                    ? (<>
                        {pageComments > 1 ? <span onClick={() => setPageComments(p => p - 1)}>&lt;Prev</span> : null}
                        <span>{pageComments <= 0 ? 1 : pageComments} from {maxPage}</span>
                        {pageComments === maxPage ? null : <span onClick={() => setPageComments(p => p + 1)}>Next&gt;</span>}
                    </>)
                    : null}
            </div>
        </div>
    );
}

export default CommentsContainer;