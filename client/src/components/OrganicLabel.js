const OrganicLabel = ({ onProductPage }) => {
  if (onProductPage) {
    return (
      <div className="organic-label-wrapper-pp">
        <div className="organic-label-pp">Luomu</div>
      </div>
    )
  } else {
    return (
      <div className="organic-label-wrapper">
        <div className="organic-label">L</div>
      </div>
    )
  }
}

export default OrganicLabel
