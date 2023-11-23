import { useNavigate, useParams } from "react-router-dom";

import * as gameService from "../../services/GameService.js";
import useForm from "../../hooks/useForm.js";
import { useEffect, useState } from "react";

export default function GameEdit() {
  const navigate = useNavigate();
  const { gameId } = useParams();
  const [game, setGame] = useState({
    //names
      title: '', 
      category: '',
      maxLevel: '',
      imageUrl: '',
      summary: '',
  });

  useEffect(() => {
    gameService.getOne(gameId).then((result) => {
      setGame(result);
    });
  }, [gameId]);

  const editGameSubtmiHandler = async (values) => {
    try {
      await gameService.edit(gameId, values);
      //add json to data folder; use Postman
      navigate("/games");
    } catch (err) {
      //Error notification
      console.log(err);
    }
  };

  const { values, onChange, onSubmit } = useForm(editGameSubtmiHandler, game);

  return (
    <section id="create-page" className="auth">
      <form id="create" onSubmit={onSubmit}>
        <div className="container">
          <h1>Create Game</h1>
          <label htmlFor="leg-title">Legendary title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={values.title}
            onChange={onChange}
            placeholder="Enter game title..."
          />

          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={values.category}
            onChange={onChange}
            placeholder="Enter game category..."
          />

          <label htmlFor="levels">MaxLevel:</label>
          <input
            type="number"
            id="maxLevel"
            name="maxLevel"
            min="1"
            value={values.maxLevel}
            onChange={onChange}
            placeholder="1"
          />

          <label htmlFor="game-img">Image:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={values.imageUrl}
            onChange={onChange}
            placeholder="Upload a photo..."
          />

          <label htmlFor="summary">Summary:</label>
          <textarea name="summary" value={values.summary} onChange={onChange} id="summary"></textarea>
          <input className="btn submit" type="submit" value="Edit Game" />
        </div>
      </form>
    </section>
  );
}
