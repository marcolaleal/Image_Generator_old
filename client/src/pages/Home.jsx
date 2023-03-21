import React, { useState, useEffect } from 'react';

import { Loader, Card, FormField } from '../components';

const Home = () => {
  const [loading, setLoading] = useState(false);
 const [allPosts, setAllPosts] = useState(null);

  return (
    <section className="max-w-7x1 mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] 
        text-[32px]">O que a comunidade está criando</h1>
      
        <p className="mt-2 text-[#666e75] text-[16px] 
        max-w-[500px]">Navegue por incríveis 
        coleções de imagens visualmente impressionantes 
        geradas por Inteligencia Artificial</p>
      </div>

      <div className="mt-16"> 
        <FormField />
      </div>

      <div className="mt-10"> 
        
      </div>

    </section>
  )
}

export default Home