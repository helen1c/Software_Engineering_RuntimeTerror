import React, {useState} from "react";
import Rating from '@material-ui/lab/Rating';

interface Props {
    mountainPathId: number,
}

export default function MountainPathRating({mountainPathId} : Props) {
    const [value, setValue] = useState<number | null>(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number|null) => {
        console.log("josipalog handleChange called with value = " + newValue);
        setValue(newValue);
        if (newValue) {
            console.log("josipalog gradeMontainPath called");
            gradeMountainPath({
                mountainPathId: mountainPathId,
                grade: newValue
            });
        }
    };

    const gradeMountainPath = (request: {mountainPathId: number, grade: number}) => {
        fetch("/api/mountain-paths/grade", {
            method: "POST",
            body: JSON.stringify(request),
            headers: new Headers({
                authorization: sessionStorage.getItem("key") || "",
                Accept: "application/json",
                "Content-Type": "application/json"
            }),
        });
    };

    return (
        <div>
            <Rating
                name="mountain-path-rating"
                size="small"
                value={value}
                onChange={handleChange}
            />
        </div>
    )
}
