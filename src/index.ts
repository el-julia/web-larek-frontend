import './scss/styles.scss';
import { ProductModel } from './components/ProductModel';
import { LarekApi } from './components/LarekApi';
import { API_URL } from './utils/constants';

const productModel = new ProductModel();

const api = new LarekApi(API_URL);

api.getProductList()
	.then(response => {
		productModel.products = response.items;
		console.log(productModel);
	})
	.catch(error => {console.log(error)});