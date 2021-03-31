import React, { useEffect, useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients , setUserIngredients ] = useState([]);
  useEffect( () => {
    fetch('https://hookspracticev2-default-rtdb.firebaseio.com/ingredients.json')
    .then( response => response.json())
    .then( responseData => {
      const loadedIgredients = [];
      for (const key in responseData) {
        loadedIgredients.push({
          id:key,
          title:responseData[key].title,
          amount:responseData[key].amount
        });
      }
      setUserIngredients(loadedIgredients)
    })
  } , []);

  useEffect( () => {
    console.log('RENDERING INGREDIENTS', userIngredients);
  }, [userIngredients])

  const filteredIngredientsHandler = filteredIngredients => {
    setUserIngredients(filteredIngredients);
  }

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
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={ () => {}}/>
      </section>
    </div>
  );
}

export default Ingredients;
