//Imports the sass files for the webpack to parse
import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
import './styles/table.scss'

//Imports the main function calls so webpack can build the main.js files based on these functions
import { handleSubmit } from './js/formHandler';
import { createNLPPost } from './js/post-builder/nlpViewPoster';

export {
    handleSubmit,
    createNLPPost
}

