import React, { useState  } from 'react'
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import "./header.css";

//Material-UI Search-Bar styling code

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },  
    },
  },
}));





function Header({ products, setProducts }) {
    const [query, setQuery] = useState('');
  
    // 1. Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 4;
  
    // 2. Filtered and paginated products
    const filteredProducts = Array.isArray(products)
      ? products.filter((product) =>
          product.title.toLowerCase().includes(query)
        )
      : [];
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
  
    // Calculate total number of pages
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
    // Handle search query change
    const handleSearchChange = (e) => {
      setQuery(e.target.value);
      setCurrentPage(1);
    };
  
    // Handle page change
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    const maxVisibleButtons = 10;
    const startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);
    const paginationButtons = [];
  
    for (let i = startPage; i <= endPage; i++) {
      paginationButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }
  
    // Next page button logic
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        handlePageChange(currentPage + 1);
      }
    };
  
  
    return (
      <section className="products">
        <h2>Our Products</h2>
        
        <div className='search-bar'>
          <Search>
            <SearchIconWrapper></SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={query}
              onChange={handleSearchChange}
            /> 
            <Button color='warning'>
              <SearchIcon />
            </Button>
          </Search>

        </div>
            
        <div className="all-products">
          {currentProducts.map((product, idx) => (
            <div className="product" key={idx}>
              <h3 className='source'>{product.source}</h3>
              <img src={product.image} alt={product.title} />
              <div className="product-info">
                <h4 className='product-title'>{product.title}</h4>
                <p className='p1'>{product.rating} &#11088;</p>
                <p className="product-price">{product.price}</p>
                  
                <div className="product-offer">            
                  <p className="p2"><s>{product.discountPrice}</s></p>
                  <p className="p3">{product.offer}</p>
                </div>
                <a className='link1' rel='noopener noreferrer' href={product.productlink} target='_blank'>
                  Check Me-<span className='link-product'>{product.source}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
            
      
        {/* Pagination */}
      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
        )}
        {paginationButtons}
        {currentPage < totalPages && (
          <button onClick={handleNextPage}>Next</button>
        )}
      </div>
      </section>
    );
  }
  
  export default Header;
  