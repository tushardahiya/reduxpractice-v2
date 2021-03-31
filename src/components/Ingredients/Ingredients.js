import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients , setUserIngredients ] = useState([]);

  const onAddIngredientHandler = ingredient => {
    fetch('https://hookspracticev2-default-rtdb.firebaseio.com/ingredients.json' , {
      method:'POST',
      body:JSON.stringify(ingredient),
      headers: { 'Content-Type':'application/json' }
    }).then(response => {
      return response.json();
    }).then( responseData => {
        setUserIngredients( prevIngredients => [
          ...prevIngredients , 
          { id:responseData.name, ...ingredient}
        ]);
    });
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient= {onAddIngredientHandler} />
      <section>
        <Search />
        <IngredientList ingredients={userIngredients} onRemoveItem={ () => {}}/>
      </section>
    </div>
  );
}

export default Ingredients;
