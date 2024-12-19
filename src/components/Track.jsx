import React, { useState } from 'react';

export default function Track({songTitle, artist, album}) {
  const [inPlaylist, setInPlayList] = useState(false);

  const handleOnClick = () => {
    inPlaylist ? setInPlayList(false) : setInPlayList(true);
  };

  return (
    <>
      <div className="track-container">
        <div>
          <p>{songTitle}</p>
          <p>{artist} | {album}</p>
        </div>
        <div>
          <button onClick={handleOnClick}>
            {!inPlaylist ? 'add' : 'remove'}
          </button>
        </div>
      </div>
    </>
  );
}
