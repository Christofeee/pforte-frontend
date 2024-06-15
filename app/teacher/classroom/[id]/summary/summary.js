import Typography from '@mui/material/Typography';

export default async function Summary() {

    return (
        <Typography variant='body2' textAlign="start" className='ms-3 py-1' component="div">
            <span className='py-3'>This class is Class Name blh blh blh fromt description</span>
            <ul style={{ listStyleType: 'circle' }} className='p-3'>
                <li className='py-3'>Meeting link</li>
                <li className='py-3'>Other links</li>
            </ul>
        </Typography>
    );
}
