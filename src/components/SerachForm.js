function SearchForm({ countries }) {
    return (
        <div id="search-form">
            <h2>See if we have what you are looking for.</h2>
            <form>
                <label>Country:</label>
                <select id="country">
                    {countries.map(({objectId,name}) => <option key={objectId} value={name}>{name}</option>)}
                </select>
                <label>Destiantion name:</label>
                <input name="destination" type="text" />
                <button type="submit">Search</button>
            </form>
        </div>
    );
}

export default SearchForm;