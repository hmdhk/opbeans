import React, {PropTypes} from 'react';
import { Link } from 'react-router';

const ProductsList = ({products}) => {

  let total_products = products.items.length;
  let total_sold_out = products.items.reduce(function(n, product) {
    return n + (product.stock === 0);
  }, 0);

  return (
      <div className="ui basic segment table-wrapper">
          { products.loading && (
              <div className="ui active inverted dimmer">
                  <div className="ui text loader">Loading</div>
              </div>
          )}
          <table className="ui celled selectable table">
              <thead>
                  <tr>
                      <th>Product name</th>
                      <th className="three wide">Type</th>
                      <th className="three wide">Amount</th>
                      <th className="three wide">Status</th>
                  </tr>
              </thead>
              <tbody>

                  {products.items.map(product =>
                      <tr key={product.id}>
                          <td>
                              <Link to={`/products/${product.id}`}>{product.name}</Link>
                          </td>
                          <td>{product.type_name}</td>
                          <td>{product.stock}</td>

                          { product.stock > 0 ? (
                            <td className="positive"><i className="icon checkmark"></i> In stock</td>
                          ) : (
                            <td className="negative"><i className="icon close"></i> Sold out</td>
                          )}
                      </tr>
                  )}

              </tbody>
              <tfoot>
                  <tr>
                      <th>{ total_products } products</th>
                      <th></th>
                      <th></th>
                      <th>{ total_sold_out } Sold out</th>
                  </tr>
              </tfoot>
          </table>
      </div>
  );
};

ProductsList.propTypes = {
  products: PropTypes.object.isRequired
};

export default ProductsList;