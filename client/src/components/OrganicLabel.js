const OrganicLabel = ({ onProductPage, onOrdersPage }) => {
  if (onProductPage) {
    return (
      <div className="organic-label-wrapper-pp">
        <div className="organic-label-pp">Luomu</div>
      </div>
    )
  }
  if (onOrdersPage) {
    return (
      <div className="organic-label-wrapper-op">
        <div className="organic-label">L</div>
      </div>
    )
  } else {
    return (
      <div className="organic-label-wrapper">
        <div className="organic-label-op">L</div>
      </div>
    )
  }
}

export default OrganicLabel
