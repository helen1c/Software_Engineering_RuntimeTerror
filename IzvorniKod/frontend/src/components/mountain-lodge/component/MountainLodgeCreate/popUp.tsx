import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select, {ValueType} from "react-select";
import {Field, Form, Formik, useFormik} from "formik";
import Compress from "react-image-file-resizer";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {IconButton} from "@material-ui/core";
import {AddAPhotoOutlined} from "@material-ui/icons";
import "./popUp.css";
import {useDispatch, useSelector} from "react-redux";
import {MainReducer} from "../../../../store/reducer";
import {findHills} from "../../../../store/actions/findAllHillsActions";
import {findUtilities} from "../../../../store/actions/findAllUtilitiesActions";
import {HillOption} from "../../models/HillOption";
import {MountainLodgeCreateRequest} from "../../models/MountainLodgeCreateRequest";

export default function FormDialog() {

    const [newImage, setNewImage] = useState("");

    const dispatcher = useDispatch();
    const [selectedOptions, setSelectedOptions] = useState([]);

    // @ts-ignore
    const handleChange = e => {
        // @ts-ignore
        setSelectedOptions(Array.isArray(e) ? e.map(x => x.value) : []);
    };

    const {results: hillResults} = useSelector((state: MainReducer) => state.findAllHillsReducer);
    const {results: utilityResults} = useSelector((state: MainReducer) => state.findAllUtilitiesReducer);

    useEffect(() => {
        if (hillResults === undefined || hillResults.length === 0) {
            console.log("Get all Hills...");
            dispatcher(findHills());
        }
    }, [dispatcher, hillResults]);

    useEffect(() => {
        if (utilityResults === undefined || utilityResults.length === 0) {
            console.log("Get all Utilities...");
            dispatcher(findUtilities());
        }
    }, [dispatcher, utilityResults]);

    const create = async (request: MountainLodgeCreateRequest) => {
        setOpen(false);
        const sRequest = {
            name: request.name,
            elevation: request.elevation,
            hillId: request.hillId,
            utilities: selectedOptions,
            image: newImage.split(",")[1],
        };

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(sRequest),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        };

        const response = await fetch("/api/mountain-lodges/create", requestOptions);
        const json = await response.json();

    }

    const showImage2 = (event: any) => {

        if (!event) return;
        let file = event.target.files[0];
        console.log(file);
        Compress.imageFileResizer(
            file, 480, 480, "JPEG", 100, 0, (uri) => {
                console.log(uri)

                let reader = new FileReader();
                if (uri !== undefined)
                    reader.readAsDataURL(uri as Blob);

                reader.onload = function (newImage) {
                    setNewImage(newImage?.target?.result as string);
                };
            }, "blob"
        );
    }
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {

        setOpen(false);
        };

    return (
        <>
            <div className="search-form">
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    STVORI DOM
                </Button>
                <Formik initialValues={{
                    name: "",
                } as MountainLodgeCreateRequest
                } onSubmit={create}>
                    {({setFieldValue}) => {
                        return (
                                     <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                                         <Form >
                                         <DialogTitle id="form-dialog-title">Stvori novi dom</DialogTitle>
                                         <DialogContent>
                                             <div className="create-column">
                                                 <div className="inputComponent textAlignLeft">
                                                     <Field className={"input-search"} placeholder={"Naziv planinarskog doma..."}
                                                            name={"name"} id={"name"}/>
                                                 </div>
                                                 <div className="inputComponent textAlignLeft">
                                                     <Field className={"input-search"} placeholder={"Nadmorska visina..."}
                                                            name={"elevation"} id={"elevation"}/>
                                                 </div>
                                             </div>

                                             <div >
                                                 <Select
                                                     className="hill-select"
                                                     isClearable={true}
                                                     isSearchable={true}
                                                     placeholder="Odaberite područje..."
                                                     name={"hillId"}
                                                     onChange={(option: ValueType<HillOption>) => setFieldValue("hillId",
                                                         option === null ? null : (option as HillOption).value)
                                                     }
                                                     options={hillResults}>
                                                 </Select>
                                                 <Select
                                                     className="utility-select"
                                                     isClearable={true}
                                                     isSearchable={true}
                                                     placeholder="Odaberite infrastrukturu..."
                                                     name={"utilities"}
                                                     isMulti
                                                     onChange={handleChange}
                                                     options={utilityResults}>
                                                 </Select>
                                             </div>
                                             <div className="create-column">

                                                 <input className={"upload-picture"}
                                                        accept={"image/*"}
                                                        id={"icon-button-file"}
                                                        type="file" multiple
                                                        onChange={(event) => {
                                                            showImage2(event)
                                                            event.target.value = ""
                                                        }}
                                                 />
                                                 {newImage ?
                                                     <div className={"wrapper-picture"}>
                                                         <img
                                                             style={{display: "block"}}
                                                             className="profileImage"
                                                             src={newImage}
                                                             alt="Slika profila"
                                                         />
                                                         <span className={"remove-picture"} onClick={() => setNewImage("")}><DeleteForeverIcon/></span>

                                                     </div>
                                                     :
                                                     <>
                                                         <div className={"wrapper-picture"}>
                                                             <div className={"picture-container"}>
                                                                 <label htmlFor="icon-button-file">
                                                                     <IconButton color="primary" aria-label="upload picture" component="span">
                                                                         <AddAPhotoOutlined/>
                                                                     </IconButton>
                                                                 </label>
                                                             </div>
                                                         </div>
                                                     </>
                                                 }
                                             </div>
                                         </DialogContent>
                                         <DialogActions>
                                             <Button onClick={handleClose} color="primary">
                                                 ODUSTANI
                                             </Button>
                                             <Button type="submit">
                                                 STVORI
                                             </Button>

                                         </DialogActions>
                                         </Form>
                                     </Dialog>
                        );
                    }}
                </Formik>
            </div>
        </>
    );
}