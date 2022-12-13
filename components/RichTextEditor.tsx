import { Component, Dispatch, SetStateAction } from 'react'
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from 'draft-js'
import dynamic from 'next/dynamic'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { EditorProps } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import ColorPicker from './ColorPicker'

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
)
type EditorType = (editorState: EditorState) => void

type Props = {
  report: string
  setReport: Dispatch<SetStateAction<string>>
}

type State = {
  editorState: EditorState
}
class RichTextEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  state: State = {
    editorState: EditorState.createWithContent(
      ContentState.createFromBlockArray(
        convertFromHTML(this.props.report).contentBlocks
      )
    ),
  }

  //is invoked immediately after a component is mounted (inserted into the tree). Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
  componentDidMount() {
    this.state
    this.onEditorStateChange
  }
  onEditorStateChange: EditorType = (editorState: EditorState) => {
    this.setState({
      editorState,
    })
    this.props.setReport(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    )
  }

  //OPTIONS
  // wrapperClassName: class applied around both the editor and the toolbar
  // editorClassName: class applied around the editor
  // toolbarClassName: class applied around the toolbar
  // wrapperStyle: style object applied around both the editor and the toolbar
  // editorStyle: style object applied around the editor
  // toolbarStyle: style object applied around the toolbar
  //   wrapperClassName="wrapper-class"
  //   editorClassName="editor-class"
  //   toolbarClassName="toolbar-class"
  //   wrapperStyle={<wrapperStyleObject>}
  //   editorStyle={<editorStyleObject>}
  // toolbarStyle={<toolbarStyleObject>}

  render() {
    const { editorState } = this.state
    return (
      <div className='max-h-[75%] max-w-xl'>
        <Editor
          editorState={editorState}
          mention={{
            // SUGGESTIONS on trigger "@"
            separator: ' ',
            trigger: '@',
            suggestions: [
              // replace with meaningful suggestion
              { text: 'Neural', value: 'Neural', url: 'Neural' },
              { text: 'Sight', value: 'Sight', url: 'Sight' },
              { text: 'TB', value: 'TB', url: 'TB' },
              { text: 'pneumonia', value: 'pneumonia', url: 'pneumonia' },
              { text: 'Patient', value: 'Patient', url: 'Patient' },
              { text: 'Model', value: 'Model', url: 'Model' },
              { text: 'pleural', value: 'pleural', url: 'pleural' },
              { text: 'cadiomediac', value: 'cadiomediac', url: 'cadiomediac' },
            ],
          }}
          toolbar={{
            colorPicker: {
              component: ColorPicker,
            },
          }}
          // hastags
          hashtag={{}}
          toolbarClassName='toolbar-class border border-zinc-500'
          wrapperClassName='demo-wrapper mt-5'
          //   editorStyle={<editorStyleObject>}
          // toolbarStyle={<toolbarStyleObject>}
          editorClassName='demo-editor max-h-[500px] px-3 overflow-y-scroll scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-zinc-400/30 border border-gray-500/30 border-b-[3px] rounded-sm scroll-smooth'
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    )
  }
}
export default RichTextEditor
