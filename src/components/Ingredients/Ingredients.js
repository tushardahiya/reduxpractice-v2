import React, { useEffect, useState, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients , setUserIngredients ] = useState([]);

  useEffect( () => {
    console.log('RENDERING INGREDIENTS', userIngredients);
  }, [userIngredients])

  //usecallback to the filteredingredientshandler so that it 
  //doesnt render again and again on executing because it 
  //also causes  rerender
  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setUserIngredients(filteredIngredients);
  } , [])

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
