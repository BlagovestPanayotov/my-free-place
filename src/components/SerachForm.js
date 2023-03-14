function SearchForm() {
    return (
        <div id="search-form">
            <h2>See if we have what you are looking for.</h2>
            <form>
                <table>
                    <tr>
                        <label>Country</label>
                        <select id="country">
                            <option value="bulgaria">Bulgaria</option>
                            <option value="england">England</option>
                            <option value="iceland">Iceland</option>
                            <option value="portugal">Portugal</option>
                        </select>
                    </tr>
                    <tr>
                        <label>Destiantion name</label>
                        <input name="destination" type="text" />
                    </tr>
                    <input type="submit" value="Search" />
                </table>
            </form>
        </div>
    );
}

export default SearchForm;