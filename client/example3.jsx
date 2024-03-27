/* useState is not the only hook exposed by react. The example below shows a
   component that needs to update based on data coming back from the server.
   However, we also want the component to render before the data comes back
   so that the user can see something.

   To accomplish this, we will use the useEffect hook in tandem with useState.
   The useEffect hook is useful for things like fetching data, setting up an
   pub/sub subscription, or manually editing the DOM. Essentially it is where
   your non-render code might live in your component.
*/

const React = require('react');
const { useState, useEffect } = React; // Pull useState and useEffect out of react.
const { createRoot } = require('react-dom/client');

const SongContainer = (props) => {
    /* First we setup our songs hook so that our component will update when the
       array of songs updates. We will base it off the props.songs array.
    */
    const [songs, setSongs] = useState(props.songs);

    /* Next we register our effect. This will asynchronously run in the background
       of our component, and will not delay our component from rendering. The first
       param of useEffect is a callback function of the code we want to run in the
       background. The second is an optional array that contains the list of variables
       the effect depends on.

       Since our effect does not rely on any variables, we will leave it empty. If we
       didn't pass the array in at all, it would call our effect every time the component
       got rendered. Because we passed an array, it will only recall the effect when the
       variables in that array update. Since it is empty, it won't call again.

       When our server finally responds, we will update the songs hook which will rerender
       the component. Because this rerenders the component, if we had not passed an empty
       array as the second parameter our effect would run again causing an infinite loop.
    */
    useEffect(() => {
        /* React does not want top-level async functions being used in effects, and so it
           recommends nesting them inside of a normal function and then calling them.
        */
        const loadSongsFromServer = async () => {
            const response = await fetch('/getSongs');
            const data = await response.json();
            setSongs(data);
        };
        loadSongsFromServer();
    }, []);
    
    /* Our effect runs in the background, so immediately our component will render with
       the code below. This is preferrable, as it shows the user the page has loaded and
       is now just waiting for data. You can see production applications do this all the time.
       For example, go to youtube. The first time you load the main page, it will show the
       right layout but with grayed out boxes in place of videos. Eventually the server
       responds with video data, and the gray boxes are replaced.

       Realistically our request for song data will likely be faster than the eye can
       process (at least when run locally). You can force a delay to see this effect
       by putting the code inside the effect within a setTimeout() for a few seconds.
       Don't do this in production, obviously.
    */
    if(songs.length === 0) {
        return (
            <div>
                <h3>No Songs Yet!</h3>
            </div>
        );
    }

    const songList = songs.map((song) => {
        return (
            <div key={song.title}>
                <h2>{song.artist} - <i>{song.title}</i></h2>
            </div>
        );
    });

    return(
        <div>
            <h1>My favorite songs!</h1>
            {songList}
        </div>
    )
}

/* Our effect and our state hook will handle rerendering the component, but w
   need to kick off the process by rendering it the first time.
*/
const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render( <SongContainer songs={[]} /> );
}

window.onload = init;