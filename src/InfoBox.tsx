import { IpData } from './Types'
interface InfoBoxProps {
	info: IpData
}
export default function InfoBox({ info }: InfoBoxProps) {
	return (
		<div className='info-display'>
			<div className='info-box'>
				<p>IP ADDRESS</p>
				<h1>{info.ip}</h1>
			</div>
			<div className='divider'></div>
			<div className='info-box'>
				<p>LOCATION</p>
				<h1>{info.location}</h1>
			</div>
			<div className='divider'></div>
			<div className='info-box'>
				<p>TIMEZONE</p>
				<h1>{info.timezone}</h1>
			</div>
			<div className='divider'></div>
			<div className='info-box'>
				<p>ISP</p>
				<h1>{info.isp}</h1>
			</div>
		</div>
	)
}
