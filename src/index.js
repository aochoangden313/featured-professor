import "./index.scss"
import {select, useSelect} from "@wordpress/data"

wp.blocks.registerBlockType("ourplugin/featured-professor", {
  title: "Professor Callout",
  description: "Include a short description and link to a professor of your choice",
  icon: "welcome-learn-more",
  category: "common",
  attributes: {
    profId: { type: "string" }
  },
  edit: EditComponent,
  save: function () {
    return null
  }
})

function EditComponent(props) {
  const allProfs = useSelect(select => {
    return select("core").getEntityRecords("postType", "professor", {per_page: -1});
  })

  if (allProfs == null) return (<p>Loading...</p>)

  return (
    <div className="featured-professor-wrapper">
      <div className="professor-select-container">
        <select onChange={e => props.setAttributes({ profId: e.target.value })}>
          <option value="">Select a professor</option>
          {allProfs.map(prop => {
            return  <option value={prop.id} selected={props.attributes.profId == prop.id}>{prop.title.rendered}</option>
          })}        
        </select>
      </div>
      <div>
        The HTML preview of the selected professor will appear here.
      </div>
    </div>
  )
}