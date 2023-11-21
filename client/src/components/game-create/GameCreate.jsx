import { useNavigate } from "react-router-dom";

import * as gameService from "../../services/GameService.js";

export default function GameCreate() {
  const navigate = useNavigate();

  const createGameSubtmiHandler = async (e) => {
    e.preventDefault();

    //names
    const gameData = Object.fromEntries(new FormData(e.currentTarget));

    //Add serviceLayers
    try {
      await gameService.create(gameData);
      //add json to data folder; use Postman
      navigate("/games");
    } catch (err) {
        //Error notification
        console.log(err);
    }
  };

  return (
    <section id="create-page" className="auth">
      <form id="create" onSubmit={createGameSubtmiHandler}>
        <div className="container">
          <h1>Create Game</h1>
          <label htmlFor="leg-title">Legendary title:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter game title..."
          />

          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            placeholder="Enter game category..."
          />

          <label htmlFor="levels">MaxLevel:</label>
          <input
            type="number"
            id="maxLevel"
            name="maxLevel"
            min="1"
            placeholder="1"
          />

          <label htmlFor="game-img">Image:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            placeholder="Upload a photo..."
          />

          <label htmlFor="summary">Summary:</label>
          <textarea name="summary" id="summary"></textarea>
          <input className="btn submit" type="submit" value="Create Game" />
        </div>
      </form>
    </section>
  );
}
