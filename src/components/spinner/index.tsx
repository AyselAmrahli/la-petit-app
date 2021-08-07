import React, { FC } from "react";
import { EColor } from "../../shared/consts/enum";

import "./index.scss";

interface IProps {
  color?: EColor;
}

const Spinner: FC<IProps> = ({ color = EColor.SECONDARY }) => {
  return (
    <div className='g-spinner'>
      <div className={`g-spinner_circle circle_${color}`}></div>
    </div>
  );
};

export default Spinner;