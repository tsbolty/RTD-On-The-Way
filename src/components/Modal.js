import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Button from "@material-ui/core/Button";

function rand() {
	return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
	const top = 50 + rand();
	const left = 50 + rand();

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: "absolute",
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3)
	}
}));

export default function LocationModal({ locationInfo, color }) {
	const classes = useStyles();
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const body = (
		<div style={modalStyle} className={classes.paper}>
			<h2 id='simple-modal-title'>{locationInfo.name}</h2>
			{locationInfo.type === "result" ? (
				<div>
					<p id='simple-modal-description'>Address: {locationInfo.address}</p>
					<a
						href={`https://www.google.com/maps/place/?q=place_id:${locationInfo.placeId}`}
						target='_blank'
						rel='noreferrer'>
						<Button variant='outlined' color='primary'>
							View in google maps
						</Button>
					</a>
				</div>
			) : null}
		</div>
	);

	return (
		<div>
			<LocationOnIcon color={color} onClick={handleOpen} />
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='simple-modal-title'
				aria-describedby='simple-modal-description'>
				{/* <div style={modalStyle} className={classes.paper}>
					<h2 id='simple-modal-title'>{locationInfo.name}</h2>
					{locationInfo.type === "result" ? (
						<p id='simple-modal-description'>Address: {locationInfo.address}</p>
					) : null}
				 <SimpleModal />
				</div>  */}
				{body}
			</Modal>
		</div>
	);
}
