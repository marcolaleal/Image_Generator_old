import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils'
import { FormField, Loader } from '../components';

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name:'',
    prompt:'',
    photo:'',
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);

        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json', 
          }, 
          body: JSON.stringify({ prompt: form.prompt }),
        })

        const data = await response.json();

        setForm({...form, photo: `data:image/jpeg;base64,${data.photo}`})
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Por favor, entre com um prompt para gerar uma nova imagem");
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(form.prompt && form.photo) {
      setLoading(true);

      try {
        const response = await fetch('http://localhost:8080/api/v1/post',{
          method: 'POST',
          headers: {
            'Content-type': 'application/json', 
          }, 
          body: JSON.stringify(form),
        })

        await response.json();
        navigate('/');
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Por favor, entre com um prompt para gerar uma nova imagem");
    }
  }

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSurpriseMe = () =>{
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt })
  }


  return (
    <section className="max-w-7x1 mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] 
        text-[32px]">Criar</h1>
      
        <p className="mt-2 text-[#666e75] text-[16px] 
        max-w-[500px]">Crie coleções de imagens visualmente 
        impressionantes geradas por Inteligencia Artificial e 
        compartilhe com a comunidade</p>
      </div>

      <form className="mt-16 max-w-3x1" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField 
            labelName="Seu nome:"
            type="text"
            name="name"
            placeholder="Digite seu nome"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField 
            labelName="Prompt:"
            type="text"
<<<<<<< HEAD
            name="prompt"
=======
            name="Prompt"
>>>>>>> 74080426102dbef4131613bb6436694368b30736
            placeholder="Um robo de brinquedo sentado em um muro amarelo"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gray-50 border border-gray-300
          text-gray-900 text-sm rounded-lg focus:ring-blue-500 forcus:border-blue-500
          w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img 
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ):(
              <img 
                src={preview}
                alt="preview"
                className="w-9/12  h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center 
              items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5"> 
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-green-700 font-medium rounded-md 
            text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
<<<<<<< HEAD
            {generatingImg ? "Gerando..." : "Gerar nova imagem"}
=======
            {generatingImg ? "Gerando..." : "Gerado"}
>>>>>>> 74080426102dbef4131613bb6436694368b30736
          </button>
        </div>
        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">Crie uma imageme  compartilhe com outros membros da comunidade</p>
          <button
            type='submit'
            className='mt-3 text-white bg-[#6469ff] font-medium rounded-md 
            text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          >
            {loading ? "Compartilhando..." : "Compartilhar com a comunidade"}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost