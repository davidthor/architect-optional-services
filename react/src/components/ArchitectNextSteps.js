import React from 'react';

class ArchitectNextSteps extends React.Component {

  render() {
    return(
      <div className="card">
        <div id="card-header">
          <h4>Congratulations!</h4>
        </div>
        <div className="card-content">
          <p>You've deployed your app locally. Now what?</p>
          <p>Below are additional steps you can try out with your newly deployed <a target={"_blank"} rel="noreferrer" href='https://docs.architect.io/tutorial/create-component/'>component</a>.</p>
          <ul>
            <li>Check out Hot-reloading</li>
              <ol>
                <li>Go to <kbd className='cmp_input'>src/components/ArchitectNextSteps.js</kbd> in your project folder and open it.</li>
                <li>Update the header on line 9, <kbd className="cmp_input">“Congratulations!”</kbd>, to <kbd className="cmp_input">Congratulations, “&lt;Your name&gt;!”</kbd>, then save the file.</li>
                <li>The app will automatically apply the new changes! For more info, checkout out our <a target={"_blank"} rel="noreferrer" href="https://docs.architect.io/">docs</a>.</li>
              </ol>
            <br/>
            <li>Deploy your app to the cloud via Architect <b>(Recommended)</b></li>
            <ol>
                <li>Login or register a new Architect account for free at <a target={"_blank"} rel="noreferrer" href="https://cloud.architect.io/signup">architect.io</a></li>
                <li>Authenticate using the CLI by running the command <kbd className='cmp_input'>architect login</kbd></li>
                <li>Deploy your app to the cloud using the command <kbd className='cmp_input'>architect deploy</kbd></li>
            </ol>
          </ul>
        </div>
      </div>
    )
  }
}

export default ArchitectNextSteps;

