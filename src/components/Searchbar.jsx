const Searchbar = ({ products, setProducts, searchTerm, setSearchTerm, setSearchResults }) => {
    

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);

        const lowerCase = searchTerm.toLowerCase();
        const filteredProducts = products.filter((product) => 
            product.title?.toLowerCase().includes(lowerCase) ||
            product.strain?.toLowerCase().includes(lowerCase))
            
            if (searchTerm) {
                setSearchResults(filteredProducts)
            } else {
                setProducts(products)
            }
        };

    return (
        <>
            <div className='search-container'>
                <label>
                    Search:&nbsp;
                </label>
                <input 
                    className='search-input'
                    placeholder='search by title or strain'
                    type='text'
                    id='search'
                    name='search'
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
        </>
    )
}

export default Searchbar