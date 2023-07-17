import React from "react";
import '../GenresInDb/GenresInDb.css'

function GenresInDb() {
  return (
    <div className="col-lg-6 mb-4 genres-in-db">
      <div className="card-container">
        <div className="card-header">
          <h5 className="card-title">Clasificación productos</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="card-item">
                <div className="card-item-body">Guerra</div>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="card-item">
                <div className="card-item-body">Aventura</div>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="card-item">
                <div className="card-item-body">Terror</div>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="card-item">
                <div className="card-item-body">hardcore</div>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
          
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenresInDb;
