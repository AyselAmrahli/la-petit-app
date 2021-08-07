import React, { FC } from 'react';

import Typography from '@material-ui/core/Typography';

import './index.scss';


const Logo: FC = () => {
  return (
      <Typography component="h5" variant="h5" className="g-logo">
          GuavaPay
      </Typography>
  )
};

export default Logo;
