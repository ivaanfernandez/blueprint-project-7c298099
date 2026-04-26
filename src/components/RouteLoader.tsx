const RouteLoader = () => {
  return (
    <div className="route-loader" role="status" aria-live="polite" aria-label="Loading">
      <div className="route-loader-content">
        <div className="route-loader-pulse" />
        <div className="route-loader-text">LOADING SYSTEM</div>
        <div className="route-loader-bars">
          <div className="route-loader-bar" />
          <div className="route-loader-bar" />
          <div className="route-loader-bar" />
        </div>
      </div>
    </div>
  );
};

export default RouteLoader;
