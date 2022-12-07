import { Component, Dispatch, SetStateAction } from 'react'
import { EditorState, convertToRaw } from 'draft-js'
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
    editorState: EditorState.createEmpty(),
  }

  onEditorStateChange: EditorType = (editorState: EditorState) => {
    this.setState({
      editorState,
    })
    this.props.setReport(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    )
  }

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
      <div>
        <Editor
          editorState={editorState}
          mention={{
            // SUGGESTIONS on trigger "@"
            separator: ' ',
            trigger: '@',
            suggestions: [
              // replace with meaningful suggestion
              { text: 'APPLE', value: 'apple', url: 'apple' },
              { text: 'BANANA', value: 'banana', url: 'banana' },
              { text: 'CHERRY', value: 'cherry', url: 'cherry' },
              { text: 'DURIAN', value: 'durian', url: 'durian' },
              { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
              { text: 'FIG', value: 'fig', url: 'fig' },
              { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
              { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
            ],
          }}
          toolbar={{
            colorPicker: {
              component: ColorPicker,
            },
          }}
          // hastags
          hashtag={{}}
          wrapperClassName='demo-wrapper'
          editorClassName='demo-editor h-[500px]'
          onEditorStateChange={this.onEditorStateChange}
        />
        <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
      </div>
    )
  }
}
export default RichTextEditor
