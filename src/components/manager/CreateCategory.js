import { useState } from 'react';
import Axios from '../../helpers/axios';
import './CreateCategory.scss';
import ManagerNav from './ManagerNav';

export default function CreateCategory(props) {
  const [name, setName] = useState('');
  const [isFood, setIsFood] = useState(false);

  const nameOnChange = (event) => {
    setName(event.target.value);
  };

  const isFoodOnChange = (event) => {
    setIsFood(event.target.value);
  };

  const create = (event) => {
    event.preventDefault();

    const data = {
      name: name,
      isFood: isFood,
    };
    const URL = `/api/categories/`;
    const promise = Axios.post(URL, data)
      .then((response) => {})
      .catch();
    return promise;
  };

  return (
    <>
      <ManagerNav></ManagerNav>
      <section className="new-category">
        <form className="category-form" method="POST" action="/login">
          <h2 id="category-title">Create category</h2>
          <h3>Name:</h3>
          <input
            type="text"
            className="category-name"
            required
            name="name"
            onChange={nameOnChange}
          />

          <h3>Is food?:</h3>
          <select
            className="category-is-food"
            onChange={isFoodOnChange}
            name="is-food">
            <option value="false">False</option>
            <option value="true">True</option>
          </select>
          <button
            onClick={create}
            type="submit"
            className="create-category-button">
            Create category
          </button>
        </form>
        {/* {props.error ? <div id="error">{props.error}</div> : null} */}
      </section>
    </>
  );
}
