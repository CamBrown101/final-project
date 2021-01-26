import { useState, useEffect } from 'react';
import Axios from '../../helpers/axios';
import './CreateItem.scss';
import ManagerNav from './ManagerNav';

export default function CreateItem(props) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('Beer');

  //fetch category data so we can dynamically
  //place it in the select box
  useEffect(() => {
    const URL = `/api/categories/`;
    Axios.get(URL)
      .then((response) => {
        setCategories(response.data);
      })
      .catch(function (error) {
        console.log('Error fetching categories');
      });
  }, []);

  const nameOnChange = (event) => {
    setName(event.target.value);
  };

  const priceOnChange = (event) => {
    setPrice(event.target.value);
  };

  const descriptionOnChange = (event) => {
    setDescription(event.target.value);
  };

  const quantityOnChange = (event) => {
    setQuantity(event.target.value);
  };

  const isActiveOnChange = (event) => {
    setIsActive(event.target.value);
  };

  const categoryOnChange = (event) => {
    setCategory(event.target.value);
  };

  const create = (event) => {
    event.preventDefault();

    const data = {
      name: name,
      price: price,
      description: description,
      quantity: quantity,
      isActive: isActive,
      category: category,
    };
    const URL = `/api/menu/`;
    return Axios.post(URL, data)
      .then((response) => {
        // if (response.data === 'exists') {
        //   props.setError('Email already used');
        // }

        if (response.data.email) {
          console.log('menu-item created');
        }
      })
      .catch();
  };

  return (
    <>
      <ManagerNav></ManagerNav>
      <section className="new-menu-item">
        <form className="menu-item-form" method="POST" action="/login">
          <h2 id="menu-item-title">Create menu-item</h2>
          <h3>Name:</h3>
          <input
            type="text"
            className="menu-item-name"
            required
            name="name"
            onChange={nameOnChange}
          />
          <h3>Description:</h3>
          <input
            type="description"
            className="menu-item-description"
            required
            name="description"
            onChange={descriptionOnChange}
          />
          <h3>Price:</h3>
          <input
            type="number"
            max="9999"
            className="menu-item-price"
            required
            name="price"
            onChange={priceOnChange}
          />
          <h3>quantity:</h3>
          <input
            type="number"
            max="9999"
            className="menu-item-quantity"
            required
            name="quantity"
            onChange={quantityOnChange}
          />
          <h3>Category:</h3>
          <select
            className="menu-item-category"
            onChange={categoryOnChange}
            name="category">
            {categories.map((e, key) => {
              return (
                <option key={key} value={e.name}>
                  {e.name}
                </option>
              );
            })}
          </select>
          <h3>Is active?:</h3>
          <select
            className="menu-item-is-active"
            onChange={isActiveOnChange}
            name="is-active">
            <option value="false">False</option>
            <option value="true">True</option>
          </select>
          <button
            onClick={create}
            type="submit"
            className="create-menu-item-button">
            Create menu-item
          </button>
        </form>
        {/* {props.error ? <div id="error">{props.error}</div> : null} */}
      </section>
    </>
  );
}
