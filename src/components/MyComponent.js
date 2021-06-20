import React from "react";

const MyComponent = ({ column, title, words }) => {
	return (
		<div className={`col-${column}`}>
			<div className='card'>
				<img src='...' className='card-img-top' alt='...' />
				<div className='card-body'>
					<h5 className='card-title'>{title}</h5>
					<p className='card-text'>{words}</p>
					<a href='#' className='btn btn-primary'>
						Go somewhere
					</a>
				</div>
			</div>
		</div>
	);
};

export default MyComponent;
