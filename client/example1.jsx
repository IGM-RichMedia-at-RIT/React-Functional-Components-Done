/* This demo assumes you have read and understand the React-Class-Components-Done
   demo. Be sure to take a look at that demo first before reading this one.

   Below we have what is known as a "Functional Stateless Component". React class
   components are and older syntax, that have been replaced with functional components.
   Functional components are lighter weight since we can opt-in to features, rather
   than just have them all.

   The job of a functional component is to ultimately return some JSX to be rendered,
   much like the class component's render() function.
*/
const React = require('react');

// Grab the createRoot function from react-dom/client. See init for more info.
const { createRoot } = require('react-dom/client');

const HelloWorld = () => {
    return (
        <div>
            Hello World!
        </div>
    );
};

/* Once we make a functional component, it is rendered the exact same way as a
   class component might be. 
*/
const init = () => {
    /* In older versions of react, we would use ReactDOM.render(). However, in
       React 18, it is now preferrable to create a root using the createRoot
       function from react-dom/client, and then render into that root. This
       has some advantages, like allowing us to render multiple of the same
       component into the same DOM container.
    */
    const root = createRoot(document.getElementById('app'));
    root.render( <HelloWorld /> );
};

window.onload = init;