import React from 'react';
import './App.css';
import Gifticon from './components/Gifticon';

const gifticons = [{
  'id' : 1,
  'name' : '스타벅스',
  'exp_date' : '20200820',
  'used' : 'false',
  'barcode_img' : 'https://placeimg.com/64/64/animals/1'
},
{
  'id' : 2,
  'name' : '할리스',
  'exp_date' : '20200819',
  'used' : 'true',
  'barcode_img' : 'https://placeimg.com/64/64/animals/2'
},
{
  'id' : 3,
  'name' : '커피빈',
  'exp_date' : '20200818',
  'used' : 'true',
  'barcode_img' : 'https://placeimg.com/64/64/animals/3'
}]

function App() {
  return (
    <div>
      {
      gifticons.map(g => {
        return(
          <Gifticon
          key = {g.id}
          id = {g.id}
          barcode_img = {g.barcode_img}
          name = {g.name}
          exp_date = {g.exp_date}
          used = {g.used}
        />
        );
      })
    }
    </div>
  );
}
export default App;