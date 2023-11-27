import { useContext, useEffect, useMemo, useReducer, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import * as gameService from "../../services/GameService.js";
import * as commentService from "../../services/commentService.js";
import AuthContext from "../../contexts/authContext.jsx";
import reducer from "./commentReducer.js";
import useForm from "../../hooks/useForm.js";
import { Link } from "react-router-dom";
import { pathToUrl } from "../../utils/pathUtils.js";
import Path from "../../paths.js";

export default function GameDetails() {
  const navigate = useNavigate();
  const { email, userId } = useContext(AuthContext);
  const [game, setGame] = useState({});
  // const [comments, setComments] = useState([]);
  const [comments, dispatch] = useReducer(reducer, []);
  const { gameId } = useParams();

  useEffect(() => {
    gameService.getOne(gameId).then(setGame);

    commentService.getAll(gameId).then((result) => {
      dispatch({
        type: "GET_ALL_COMMENTS", //this could be everything by name and also the payload
        payload: result,
      });
    });
  }, [gameId]);

  const addCommentHandler = async (values) => {

    const newComment = await commentService.create(
      gameId,
      values.comment,
    );
    newComment.owner = { email };

    // setComments((state) => [...state, { ...newComment, author: { email } }]);
    dispatch({
        type:'ADD_COMMENT',
        payload: newComment
    })
  };

  const deleteButtonClickHandler = async () =>{
    const hasConfirmed = confirm(`Are you sure you want to delete ${game.title}`);

    if(hasConfirmed) {
      await gameService.remove(gameId);

      navigate('/games');
    }
  }

  //TODO: temp solution for form reinitialization
  const initialValues = useMemo(() => ({
    comment:'',
  }), []);

  const {values, onChange, onSubmit} = useForm(addCommentHandler, initialValues);

  return (
    <section id="game-details">
      <h1>Game Details</h1>
      <div className="info-section">
        <div className="game-header">
          <img className="game-img" src={game.imageUrl} alt={game.title} />
          <h1>{game.title}</h1>
          <span className="levels">MaxLevel: {game.maxLevel}</span>
          <p className="type">{game.category}</p>
        </div>

        <p className="text">{game.summary}</p>

        <div className="details-comments">
          <h2>Comments:</h2>
          <ul>
            {comments.map(({ _id, text, owner: { email } }) => (
              <li key={_id} className="comment">
                <p>
                  {email}: {text}
                </p>
              </li>
            ))}
          </ul>

          {comments.length === 0 && <p className="no-comment">No comments.</p>}
        </div>

                    {userId === game._ownerId && 
                <div className="buttons">
                    <Link to={pathToUrl(Path.GameEdit, {gameId})} className="button">Edit</Link>
                    <button className="button" onClick={deleteButtonClickHandler}>Delete</button>
                </div>
                }
      </div>

      <article className="create-comment">
        <label>Add new comment:</label>
        <form className="form" onSubmit={onSubmit}>
          <textarea name="comment" value={values.comment} onChange={onChange} placeholder="Comment......"></textarea>
          <input className="btn submit" type="submit" value="Add Comment" />
        </form>
      </article>
    </section>
  );
}
