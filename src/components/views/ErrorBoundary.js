import { Component } from 'react';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        console.log('getDerivedStateFromError');
        console.log('error:', error);

        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log error
        console.log('componentDidCatch');
    }

    render() {
        if (this.state.hasError) {
            return (
                <div id='errorBoundary'>
                    <h1>Something went wrong. Please try again later!</h1>
                    <img src='img/crying-face.jpg' alt='cry-face' />
                </div>
            );
        }

        return (
            <>
                {this.props.children}
            </>
        );
    }
}