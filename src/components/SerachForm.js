function SearchForm({ countries }) {
    return (
        <div id="search-form">
            <h2>See if we have what you are looking for.</h2>
            <form>
                <label>Country:</label>
                <select id="country">
                    {countries.map(([k, v]) => <option key={k} value={v}>{v}</option>)}
                </select>
                <label>Destiantion name:</label>
                <input name="destination" type="text" />
                <input type="submit" value="Search" />
            </form>
        </div>
    );
}

export default SearchForm;