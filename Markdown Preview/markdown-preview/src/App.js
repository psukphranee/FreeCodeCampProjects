import logo from './logo.svg';
import './App.css';
import React, {Component} from "react";
import marked from 'marked';

const renderer = new marked.Renderer();
renderer.link = function(href, title, text){
  return(
  `
  <a target="_blank" href="${href}">${text}</a>
  `);
}

marked.setOptions(
  {
    breaks: true
  }
);

const Editor = (props) => {
  return(
      <textarea id="editor"
        type="text"
        value={props.markdown}
        onChange={props.onChange}
        classNmae="editorWrap"
        />
  );
}

const Preview = function(props){
  return(
      <div id="preview"
        dangerouslySetInnerHTML={{__html: marked(props.markdown), renderer: renderer}}
        />
  );
}

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      markdown: placeholder,

    };
    this.handleMarkdownChange = this.handleMarkdownChange.bind(this);
  }
  
  handleMarkdownChange(e){
    this.setState({markdown: e.target.value});
  }
  
  render(){
    return (
      <div>
        <div className="editorWrap">
        <Editor markdown={this.state.markdown} onChange={this.handleMarkdownChange}/>
        </div>
        <div className='previewWrap'>
          <Preview markdown={this.state.markdown}/>
        </div>
      </div>
    );
  }
}

const placeholder = `# Header1
## Sub heading

[GitHub](https://www.github.com)

Inline Code: \`<div></div>\` between backticks

Block Code:
\`\`\`
function someFunction(arg1, arg2){
   return 0;
}
\`\`\`

**Bold Text**

>This is a 
>blockquote
>
>the end

List Items
1. one
2. two

![Tux, the Linux mascot](https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg)
`;


export default App;
