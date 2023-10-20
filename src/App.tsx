import { useState, useEffect, FormEvent } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { ApiRes, IpData } from './Types'
import InfoBox from './InfoBox'
import Map from './Map'

function App() {
	const [data, setData] = useState<ApiRes>()
	const [currAddress, setCurrAddress] = useState<string>()
	const [isLoading, setIsLoading] = useState(true)
	const [position, setPosition] = useState<[number, number]>([0, 0])

	async function getCoordinates(data: ApiRes): Promise<[number, number]> {
		const mapResponse = await fetch(
			`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
				data.location.region
			)}&key=a2b4f8c166f24ffab3fec9132c033870`
		)
		const mapRes = await mapResponse.json()
		const coordinates: [number, number] = mapRes.results[0].geometry

		return coordinates
	}

	const getAddress = async () => {
		setIsLoading(true)
		const response = await fetch(
			'https://geo.ipify.org/api/v2/country?apiKey=at_tYQA10m8MstWeenTqVrOL5zauyP6H'
		)
		const res: ApiRes = await response.json()
		setData(res)
		const coordinates = await getCoordinates(res)
		setPosition(coordinates)
		setIsLoading(false)
	}

	useEffect(() => {
		getAddress()
	}, [])

	const addressIsValid = (value: string | undefined) => {
		const regex = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/
		if (value) {
			return regex.test(value)
		}
		return false
	}

	const getNewAddress = async () => {
		setIsLoading(true)
		const response = await fetch(
			`https://geo.ipify.org/api/v2/country?apiKey=at_tYQA10m8MstWeenTqVrOL5zauyP6H&ipAddress=${currAddress}`
		)
		const res = await response.json()
		setData(res)
		const coordinates = await getCoordinates(res)
		setPosition(coordinates)
		setIsLoading(false)
	}

	const currInfo: IpData = {
		ip: data?.ip,
		location: `${data?.location.country},${data?.location.region}`,
		timezone: data?.location.timezone,
		isp: data?.isp,
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (addressIsValid(currAddress)) {
			getNewAddress()
		}
	}

	return !isLoading ? (
		<>
			<div className='tracker-main'>
				<div className='input-side'>
					<h1>Ip Address Tracker</h1>
					<form className='ip-form' onSubmit={handleSubmit}>
						<input
							onChange={e => setCurrAddress(e.target.value)}
							className='ip-input'
							type='text'
							placeholder='Search for any ip address'
						/>

						<button>
							<img src='icon-arrow.svg' />{' '}
						</button>
					</form>
				</div>
				<div className='map-side'>
					{data && <InfoBox info={currInfo} />}
					{/* <Map position={position} /> */}
				</div>
			</div>
		</>
	) : (
		<div className='tracker-main'>
			<div className='input-side'>
				<h1>Ip Address Tracker</h1>
				<form className='ip-form' onSubmit={handleSubmit}>
					<input
						onChange={e => setCurrAddress(e.target.value)}
						className='ip-input'
						type='text'
						placeholder='Search for any ip address'
					/>

					<button>
						<img src='icon-arrow.svg' />{' '}
					</button>
				</form>
			</div>
			<div className='map-side'>
				<InfoBox info={{ ip: '?', location: '?', timezone: '?', isp: '?' }} />
			</div>
		</div>
	)
}

export default App
