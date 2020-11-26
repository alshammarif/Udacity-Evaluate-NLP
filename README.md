# Evaluating Articles using Natural Language Processing - Udacity Project 4
###### completed by Farah Alshammari

```
The code basis of this project was provided by Udacity. I have modified them to suit the project requirements while also adding my own CSS styling to the content. 

```

### Project Summary Given by Udacity:

The motive of this project is to have you a taste of the environment and tools you will most likely come across in a front end role. Your focus should be to understand the role every tool and technology is playing in the overall architecture. You shouldn’t feel the need to memorize the particular commands, config setups, or structure that we create here. Every projetc in the industry will have its own custom setup, but *if you understand the moving pieces, you will be able to get the gist of even far more complicated projects than this one.*

We will build a web tool that allows users to run Natural Language Processing (NLP) on articles or blogs found on other websites. NLP is the ability of an application to understand the human language, written or oral.

```
Please Note: to start the Web App properly please enter the project folder in the terminal. There are two configurations provided, Production or Development. Below will show how to start either.

Development Stage: 

[comment out the workbox script temporarily in index.html as it will throw errors as it doesn't find service-worker in the dev.]

$ npm build-dev --> [webpack 5 does not support dev-server so it will not be able to run live]
$ npm start --> to start the server for the Web App

Production Stage: 

[DELETE the 'dist' folder if you ran the development stage first.] [uncomment the service worker script in the index.html file]

$ npm build-prod
$ npm start  

```

**PLEASE NOTE:** that I am facing issues with workbox as it adds 'auto' in front of all the main files in the dist. I am unsure how to fix it but if you manually go to the end of the service-worker.js file and delete the 'auto' in front of the file names the service-worker before starting the server the plugin will run without issues. 

```
code produced by workbox plugin:

e.precacheAndRoute([{url:".auto/index.html",revision:"num"},{url:"automain.css",revision:"num"},{url:"automain.js",revision:"num"}],{})}))

change to fix it: 

e.precacheAndRoute([{url:"index.html",revision:"num"},{url:"main.css",revision:"num"},{url:"main.js",revision:"num"}],{})}))
```


------

### Project Requirements and Parameters: 

1. [x] Be set up with Webpack, Express, Node, and Sass, and Service Workers

2. [x] Have separate dev `webpack.dev.js` and prod `webpack.prod.js` configurations for Webpack

3. [ ] Have the developer environment set up with the Webpack dev server
	* `webpack-dev-server` does not seem to be working with webpack 5 so I was not able to use it but I have it downloaded and set up for when it does start working again

4. [x] Have a minimum of one form field

5. [x] Make one request to the Meaning Cloud API

6. [x] Use Sass for styling

7. [x] Minify js and styles in the production environment

8. [x] Response from the API must be added to the view for a user to see

9. [ ] Be able to show content offline 
	* `workbox-webpack-plugin` has a bug where it adds `auto` in front of all the file names. I was not able to figure out how to resolve that issue other than fixing it up manually. It theoretically works once the file names are fixed. (no longer throws errors in the browser console about being unable to GET the files with the wrong names)

------

### Changes I Made to the Original HTML/CSS Code: 

* HTML Changes: 
1. Changed the input area to a text area 
2. Added the service-worker script

* CSS Changes: 
1. Chose a green theme for the web app
2. Changed the navbar to be green and added some height 
	* Gave the navigation a different background and color to stand out a bit from the navbar
3. Changed the text/font colors to more green colors
4. Displayed the results from the API in a styled table also within the green theme
5. Displayed any 'errors' or 'warnings' in red boxes. 
	* If it is from the API itself it will have the status code and message displayed
	* If it is from the web app itself it will display the warning text such as inputing an empty field or a valid link with no text/sentence content to show

------

### My server/ Folder Set Up: 

#### My index.js File Set Up: 

* The basis of the server file was provided by Udacity
* Added `cors` and `body-parser` middleware to the `server/index.js` file to allow the server to process the info sent
* Set up a `data` list field that will save any sentence content sent to the server.
* Created a `GET` and `POST` method so the server can both save and send the data from the API 

#### My meaningCloudAPI.js File Set Up: 

* Global Variables 
* Main GET function that retrieves the API data from the input 
* Checkers to check if the returned API data is valid to display, returns error messages
	* Checker if status code is zero which equals valid information from the API
	* Checker if data with status code zero has any sentence data to return for viewing
* Information extracters that pulls the wanted data from the large API response
	* Sentences extracter - gets the basic information [text, score, agreement, confidence, and segment list] 
	* Segments extracter - gets the basic information [text, score, agreement, confidence]	
* Server side POST method that sends the API data to the server and saves it in a list on the server
* Server side GET method that recieves the data from the server that was saved

------

### My Client/ Folder Set Up: 

#### My js/ Folder Set Up: 

All the Client side Javascript: 

##### formHandler.js File Set Up: 

* Main Submit function that retrieves the input value of the form text area and sends it to the appropriate function(s)
* Checks if there is any info inputed or if the value is an empty ''
* Checks if the information is a valid URL or text returns '&url=[url input here]' or '&txt=[text/other input here]' to send to the API function

##### nlpViewPoster.js File Set Up: 

* Global Variables
* Main Creation function that builds and fills the table with the data list given. 
* Row Helper creates a new row for the sentence or segment that is passed through
* Column Helper that creates the column item for the row for each data point sentence or segment
* Title Row Helper that creates the Column Names
* Error Message creates the error message box if an error is passed instead of valid data

------

#### My styles/ Folder Set Up: 

* Changed all .css files to .scss files as well as added my own personal styling for the webpage mentioned before

------

#### My views/ Folder Set Up: 

* Mild to no changes to the file(s) in this folder

------

#### My index.js File Set Up: 

* Imports all style files
* Imports all required functions
* Exports all required functions

------

### Webpack Config files: 

#### webpack.prod.js Configuration File Set Up:

* Require all Development Plugins
* Set up the `modules.exports` object:
	* Mode: Dev
	* Rules: 
		* babel-loader to parse JavaScript
		* style-loader + css-loader to parse Sass 
	* Plugins: 
		* html-webpack-plugin allows Webpack to parse HTML files
		* clean-webpack-plugin cleans up the Webpack 

#### webpack.dev.js Configration File Set Up: 

* Require all Production Plugins
* Set up the `modules.exports` object:
	* Mode: Prod
	* Rules: 
		* babel-loader to read JavaScript
		* mini-css-extract-plugin loader + style-loader + css-loader to parse Sass
	* Optimization:
		* terser-webpack-plugin
		* optimize-css-assets-webpack-plugin
	* Plugins: 
		* html-webpack-plugin allows Webpack to parse HTML files
		* workbox-webpack-plugin service worker that can create offline content
		* optimize-css-assets-webpack-plugin
		* mini-css-extract-plugin initialize into one .css file

