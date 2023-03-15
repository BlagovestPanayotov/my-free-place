function SearchForm() {
    return (
        <div id="search-form">
            <h2>See if we have what you are looking for.</h2>
            <form>
                <label>Country</label>
                <select id="country">
                    <option value="bulgaria">Bulgaria</option>
                    <option value="england">England</option>
                    <option value="iceland">Iceland</option>
                    <option value="portugal">Portugal</option>
                </select>
                <label>Destiantion name</label>
                <input name="destination" type="text" />
                <input type="submit" value="Search" />
            </form>
        </div>
    );
}

export default SearchForm;