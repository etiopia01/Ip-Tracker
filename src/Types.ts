interface ApiRes {
	ip: string
	location: {
		country: string
		region: string
		timezone: string
	}
	as: {
		asn: number
		name: string
		route: string
		domain: string
		type: string
	}
	isp: string
}

interface IpData {
	ip?: string
	location?: string
	timezone?: string
	isp?: string
}

export type { ApiRes, IpData }
