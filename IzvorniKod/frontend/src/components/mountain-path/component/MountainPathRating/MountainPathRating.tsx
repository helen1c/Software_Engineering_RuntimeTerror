import React, {useState} from "react";
import Rating from '@material-ui/lab/Rating';
import {findGradedPaths} from "../../../../store/actions/findAllGradedPathsActions";
import {useDispatch} from "react-redux";

interface Props {
    mountainPathId: number,
    initialValue: number | null,
    onValueChange?: (newValue: number | null) => void
}

export default function MountainPathRating({mountainPathId, initialValue, onValueChange}: Props) {
    const dispatcher = useDispatch();
    const [value, setValue] = useState<number | null>(initialValue);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
        setValue(newValue);
        if (newValue) {
            gradeMountainPath({
                mountainPathId: mountainPathId,
                grade: newValue
            }).then(() => {
                if (onValueChange) {
                    onValueChange(newValue);
                }
            });
        }
    };

    const gradeMountainPath = (request: { mountainPathId: number, grade: number }) => {
        return fetch("/api/mountain-paths/grade", {
            method: "POST",
            body: JSON.stringify(request),
            headers: new Headers({
                authorization: sessionStorage.getItem("key") || "",
                Accept: "application/json",
                "Content-Type": "application/json"
            }),
        }).then(() => {
            dispatcher(findGradedPaths());
        });
    };

    return (
        <div>
            <Rating
                name={"mountain-path-rating-" + mountainPathId}
                size="small"
                value={value}
                onChange={handleChange}
            />
        </div>
    )
}
