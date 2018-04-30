import React from 'react';
import { Form, Text, Hidden } from 'react-form';
import phil from '../data/phil';
 
export default ({meal}) => (
  <div className="meal-card">
    <table>
      <tbody>
        <tr>
          <th>Description</th>
          <td>{meal.description}</td>
        </tr>
        <tr>
          <td>Date Created</td>
          <td>{(new Date(meal.created_at)).toString()}</td>
        </tr>
        <tr>
          <td>Calories</td>
          <td>{meal.calories}</td>
        </tr>
        <tr>
          <td>Username</td>
          <td>{meal && meal.user && meal.user.username}</td>
        </tr>
      </tbody>
    </table>
  </div>
)
