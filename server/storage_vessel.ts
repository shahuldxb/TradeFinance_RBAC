import { 
  type User, type InsertUser, 
  type Vessel, type InsertVessel,
  type RoutePoint, type InsertRoutePoint,
  type VesselAlert, type InsertVesselAlert,
  type FleetStats, type VesselFilter,
  VesselStatus, VesselType, AlertType, AlertSeverity
} from "../shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getVessels(filter?: VesselFilter): Promise<Vessel[]>;
  getVessel(id: string): Promise<Vessel | undefined>;
  createVessel(vessel: InsertVessel): Promise<Vessel>;
  updateVessel(id: string, updates: Partial<InsertVessel>): Promise<Vessel | undefined>;
  deleteVessel(id: string): Promise<boolean>;
  
  getRouteHistory(vesselId: string): Promise<RoutePoint[]>;
  addRoutePoint(point: InsertRoutePoint): Promise<RoutePoint>;
  
  getAlerts(): Promise<VesselAlert[]>;
  getVesselAlerts(vesselId: string): Promise<VesselAlert[]>;
  createAlert(alert: InsertVesselAlert): Promise<VesselAlert>;
  acknowledgeAlert(id: string): Promise<VesselAlert | undefined>;
  resolveAlert(id: string): Promise<VesselAlert | undefined>;
  
  getFleetStats(): Promise<FleetStats>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private vessels: Map<string, Vessel>;
  private routePoints: Map<string, RoutePoint>;
  private alerts: Map<string, VesselAlert>;

  constructor() {
    this.users = new Map();
    this.vessels = new Map();
    this.routePoints = new Map();
    this.alerts = new Map();
    
    this.seedData();
  }

  private seedData() {
    const vesselData: InsertVessel[] = [
      {
        name: "Atlantic Pioneer",
        imo: "9234567",
        mmsi: "123456789",
        callSign: "VPLA1",
        flag: "US",
        type: VesselType.CONTAINER,
        status: VesselStatus.UNDERWAY,
        latitude: 40.7128,
        longitude: -74.0060,
        heading: 45,
        speed: 18.5,
        course: 48,
        destination: "Rotterdam",
        eta: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        length: 366,
        width: 51,
        draft: 15.5,
        deadweight: 156000,
        voyageId: "MAEU2501234",
        owner: {
          company: "Maersk Line",
          contactName: "Erik Andersen",
          contactEmail: "operations@maersk.com",
          phone: "+45 3363 3363",
          headquartersPort: "Copenhagen, Denmark"
        }
      },
      {
        name: "Pacific Voyager",
        imo: "9345678",
        mmsi: "234567890",
        callSign: "VPLB2",
        flag: "PA",
        type: VesselType.TANKER,
        status: VesselStatus.ACTIVE,
        latitude: 35.6762,
        longitude: 139.6503,
        heading: 270,
        speed: 14.2,
        course: 265,
        destination: "Singapore",
        eta: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        length: 333,
        width: 60,
        draft: 21.5,
        deadweight: 300000,
        voyageId: "TRNK2505678",
        owner: {
          company: "Teekay Tankers Ltd",
          contactName: "James Wilson",
          contactEmail: "fleet@teekay.com",
          phone: "+1 604 844 6654",
          headquartersPort: "Vancouver, Canada"
        }
      },
      {
        name: "Nordic Spirit",
        imo: "9456789",
        mmsi: "345678901",
        callSign: "VPLC3",
        flag: "NO",
        type: VesselType.CARGO,
        status: VesselStatus.ANCHORED,
        latitude: 51.9225,
        longitude: 4.4792,
        heading: 180,
        speed: 0,
        course: 0,
        destination: "Rotterdam",
        eta: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
        length: 225,
        width: 32,
        draft: 11.5,
        deadweight: 58000,
        voyageId: "WLWN2509012",
        owner: {
          company: "Wallenius Wilhelmsen",
          contactName: "Lars Olsen",
          contactEmail: "chartering@walleniuswilhelmsen.com",
          phone: "+47 22 93 40 00",
          headquartersPort: "Oslo, Norway"
        }
      },
      {
        name: "Mediterranean Star",
        imo: "9567890",
        mmsi: "456789012",
        callSign: "VPLD4",
        flag: "GR",
        type: VesselType.PASSENGER,
        status: VesselStatus.IN_PORT,
        latitude: 41.8781,
        longitude: 12.4964,
        heading: 90,
        speed: 0,
        course: 0,
        destination: "Barcelona",
        eta: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        length: 290,
        width: 32,
        draft: 8.2,
        deadweight: 12000,
        voyageId: "CSTA2503456",
        owner: {
          company: "Costa Cruises",
          contactName: "Marco Rossi",
          contactEmail: "marine.ops@costacruises.it",
          phone: "+39 010 548 4000",
          headquartersPort: "Genoa, Italy"
        }
      },
      {
        name: "Ocean Titan",
        imo: "9678901",
        mmsi: "567890123",
        callSign: "VPLE5",
        flag: "SG",
        type: VesselType.CONTAINER,
        status: VesselStatus.UNDERWAY,
        latitude: 1.3521,
        longitude: 103.8198,
        heading: 315,
        speed: 21.3,
        course: 310,
        destination: "Hong Kong",
        eta: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        length: 400,
        width: 59,
        draft: 16.0,
        deadweight: 200000,
        voyageId: "EVER2507890",
        owner: {
          company: "Evergreen Marine",
          contactName: "Chen Wei-Lin",
          contactEmail: "charter@evergreen-marine.com",
          phone: "+886 2 2505 7766",
          headquartersPort: "Taipei, Taiwan"
        }
      },
      {
        name: "Gulf Explorer",
        imo: "9789012",
        mmsi: "678901234",
        callSign: "VPLF6",
        flag: "AE",
        type: VesselType.TANKER,
        status: VesselStatus.MOORED,
        latitude: 25.2766,
        longitude: 55.2962,
        heading: 45,
        speed: 0,
        course: 0,
        destination: "Mumbai",
        eta: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
        length: 274,
        width: 48,
        draft: 17.1,
        deadweight: 115000,
        voyageId: "ADNC2502345",
        owner: {
          company: "ADNOC Logistics",
          contactName: "Ahmed Al Mansoori",
          contactEmail: "maritime@adnoc.ae",
          phone: "+971 2 602 0000",
          headquartersPort: "Abu Dhabi, UAE"
        }
      },
      {
        name: "Baltic Trader",
        imo: "9890123",
        mmsi: "789012345",
        callSign: "VPLG7",
        flag: "DE",
        type: VesselType.CARGO,
        status: VesselStatus.ACTIVE,
        latitude: 54.6872,
        longitude: 10.1969,
        heading: 60,
        speed: 12.8,
        course: 55,
        destination: "Gothenburg",
        eta: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
        length: 180,
        width: 28,
        draft: 9.5,
        deadweight: 35000,
        voyageId: "HPLG2506789",
        owner: {
          company: "Hapag-Lloyd AG",
          contactName: "Klaus Muller",
          contactEmail: "operations@hapag-lloyd.com",
          phone: "+49 40 3001 0",
          headquartersPort: "Hamburg, Germany"
        }
      },
      {
        name: "Caribbean Queen",
        imo: "9901234",
        mmsi: "890123456",
        callSign: "VPLH8",
        flag: "BS",
        type: VesselType.PASSENGER,
        status: VesselStatus.UNDERWAY,
        latitude: 25.7617,
        longitude: -80.1918,
        heading: 120,
        speed: 19.5,
        course: 125,
        destination: "Nassau",
        eta: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
        length: 320,
        width: 36,
        draft: 8.8,
        deadweight: 15000,
        voyageId: "RCCL2508901",
        owner: {
          company: "Royal Caribbean Group",
          contactName: "Michael Torres",
          contactEmail: "fleetops@rccl.com",
          phone: "+1 305 539 6000",
          headquartersPort: "Miami, USA"
        }
      },
      {
        name: "Arctic Breeze",
        imo: "9012345",
        mmsi: "901234567",
        callSign: "VPLI9",
        flag: "RU",
        type: VesselType.TANKER,
        status: VesselStatus.RESTRICTED,
        latitude: 64.5401,
        longitude: 40.5433,
        heading: 0,
        speed: 8.2,
        course: 355,
        destination: "Murmansk",
        eta: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        length: 257,
        width: 34,
        draft: 14.5,
        deadweight: 70000,
        voyageId: "SCFL2504567",
        owner: {
          company: "Sovcomflot",
          contactName: "Dmitri Petrov",
          contactEmail: "chartering@scf-group.com",
          phone: "+7 495 787 3717",
          headquartersPort: "St. Petersburg, Russia"
        }
      },
      {
        name: "Southern Cross",
        imo: "9123456",
        mmsi: "012345678",
        callSign: "VPLJ0",
        flag: "AU",
        type: VesselType.CARGO,
        status: VesselStatus.ACTIVE,
        latitude: -33.8688,
        longitude: 151.2093,
        heading: 210,
        speed: 15.7,
        course: 205,
        destination: "Melbourne",
        eta: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(),
        length: 190,
        width: 30,
        draft: 10.8,
        deadweight: 42000,
        voyageId: "ANLS2501234",
        owner: {
          company: "ANL Container Line",
          contactName: "Sarah Thompson",
          contactEmail: "operations@anl.com.au",
          phone: "+61 3 9683 0200",
          headquartersPort: "Melbourne, Australia"
        }
      },
      {
        name: "Fjord Viking",
        imo: "9234568",
        mmsi: "123456780",
        callSign: "VPLK1",
        flag: "NO",
        type: VesselType.FISHING,
        status: VesselStatus.ACTIVE,
        latitude: 69.6496,
        longitude: 18.9560,
        heading: 280,
        speed: 8.5,
        course: 275,
        destination: "Tromso",
        eta: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
        length: 65,
        width: 14,
        draft: 6.2,
        deadweight: 1200,
        voyageId: "NFSK2503456",
        owner: {
          company: "Norsk Fiskerindustri AS",
          contactName: "Henrik Johansen",
          contactEmail: "fleet@norskfisk.no",
          phone: "+47 77 60 12 00",
          headquartersPort: "Tromso, Norway"
        }
      },
      {
        name: "Harbor Master",
        imo: "9345679",
        mmsi: "234567891",
        callSign: "VPLL2",
        flag: "NL",
        type: VesselType.TUG,
        status: VesselStatus.ACTIVE,
        latitude: 51.9066,
        longitude: 4.4883,
        heading: 90,
        speed: 6.2,
        course: 88,
        destination: "Rotterdam Harbor",
        length: 32,
        width: 12,
        draft: 5.5,
        deadweight: 800,
        voyageId: "SMIT2500123",
        owner: {
          company: "Smit Towage Europe",
          contactName: "Jan de Vries",
          contactEmail: "dispatch@smittowage.com",
          phone: "+31 10 454 9911",
          headquartersPort: "Rotterdam, Netherlands"
        }
      },
      {
        name: "Eastern Dragon",
        imo: "9456780",
        mmsi: "345678902",
        callSign: "VPLM3",
        flag: "CN",
        type: VesselType.CONTAINER,
        status: VesselStatus.UNDERWAY,
        latitude: 31.2304,
        longitude: 121.4737,
        heading: 135,
        speed: 17.8,
        course: 140,
        destination: "Busan",
        eta: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        length: 350,
        width: 48,
        draft: 14.2,
        deadweight: 140000,
        voyageId: "COSCO250789",
        owner: {
          company: "COSCO Shipping",
          contactName: "Li Wei",
          contactEmail: "operations@cosco.com.cn",
          phone: "+86 21 6596 6105",
          headquartersPort: "Shanghai, China"
        }
      },
      {
        name: "Red Sea Carrier",
        imo: "9567891",
        mmsi: "456789013",
        callSign: "VPLN4",
        flag: "SA",
        type: VesselType.TANKER,
        status: VesselStatus.ACTIVE,
        latitude: 21.4858,
        longitude: 39.1925,
        heading: 320,
        speed: 13.5,
        course: 315,
        destination: "Suez Canal",
        eta: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        length: 280,
        width: 44,
        draft: 16.8,
        deadweight: 95000,
        voyageId: "BAHRI250456",
        owner: {
          company: "Bahri Shipping",
          contactName: "Mohammed Al-Farsi",
          contactEmail: "fleet@bahri.sa",
          phone: "+966 11 478 5454",
          headquartersPort: "Riyadh, Saudi Arabia"
        }
      },
      {
        name: "Amazon Explorer",
        imo: "9678902",
        mmsi: "567890124",
        callSign: "VPLO5",
        flag: "BR",
        type: VesselType.CARGO,
        status: VesselStatus.ANCHORED,
        latitude: -1.4558,
        longitude: -48.4902,
        heading: 45,
        speed: 0,
        course: 0,
        destination: "Belem",
        eta: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
        length: 195,
        width: 32,
        draft: 10.5,
        deadweight: 48000,
        voyageId: "LOGB250321",
        owner: {
          company: "Log-In Logistica",
          contactName: "Carlos Santos",
          contactEmail: "operacoes@loginlogistica.com.br",
          phone: "+55 21 2211 0200",
          headquartersPort: "Rio de Janeiro, Brazil"
        }
      },
      {
        name: "Polar Star",
        imo: "9789013",
        mmsi: "678901235",
        callSign: "VPLP6",
        flag: "FI",
        type: VesselType.CARGO,
        status: VesselStatus.UNDERWAY,
        latitude: 60.1699,
        longitude: 24.9384,
        heading: 270,
        speed: 11.2,
        course: 265,
        destination: "Stockholm",
        eta: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(),
        length: 175,
        width: 27,
        draft: 8.8,
        deadweight: 28000,
        voyageId: "FINN250678",
        owner: {
          company: "Finnlines",
          contactName: "Mikko Virtanen",
          contactEmail: "chartering@finnlines.com",
          phone: "+358 10 343 50",
          headquartersPort: "Helsinki, Finland"
        }
      },
      {
        name: "Cape Fortune",
        imo: "9890124",
        mmsi: "789012346",
        callSign: "VPLQ7",
        flag: "ZA",
        type: VesselType.TANKER,
        status: VesselStatus.MOORED,
        latitude: -33.9249,
        longitude: 18.4241,
        heading: 180,
        speed: 0,
        course: 0,
        destination: "Lagos",
        eta: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        length: 245,
        width: 42,
        draft: 15.2,
        deadweight: 85000,
        voyageId: "SAFC250890",
        owner: {
          company: "South African Marine Corp",
          contactName: "John Mbeki",
          contactEmail: "operations@samarine.co.za",
          phone: "+27 21 408 6911",
          headquartersPort: "Cape Town, South Africa"
        }
      },
      {
        name: "Jade Emperor",
        imo: "9901235",
        mmsi: "890123457",
        callSign: "VPLR8",
        flag: "HK",
        type: VesselType.CONTAINER,
        status: VesselStatus.ACTIVE,
        latitude: 22.3193,
        longitude: 114.1694,
        heading: 225,
        speed: 19.8,
        course: 220,
        destination: "Manila",
        eta: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        length: 368,
        width: 51,
        draft: 14.8,
        deadweight: 165000,
        voyageId: "OOCL250123",
        owner: {
          company: "OOCL",
          contactName: "Andy Tung",
          contactEmail: "chartering@oocl.com",
          phone: "+852 2833 3888",
          headquartersPort: "Hong Kong"
        }
      },
      {
        name: "Viking Sentinel",
        imo: "9012346",
        mmsi: "901234568",
        callSign: "VPLS9",
        flag: "DK",
        type: VesselType.PASSENGER,
        status: VesselStatus.UNDERWAY,
        latitude: 55.6761,
        longitude: 12.5683,
        heading: 0,
        speed: 16.5,
        course: 355,
        destination: "Oslo",
        eta: new Date(Date.now() + 10 * 60 * 60 * 1000).toISOString(),
        length: 238,
        width: 28,
        draft: 6.4,
        deadweight: 8500,
        voyageId: "DFDS250456",
        owner: {
          company: "DFDS Seaways",
          contactName: "Henrik Nielsen",
          contactEmail: "fleet@dfds.com",
          phone: "+45 33 42 33 42",
          headquartersPort: "Copenhagen, Denmark"
        }
      },
      {
        name: "Coral Reef",
        imo: "9123457",
        mmsi: "012345679",
        callSign: "VPLT0",
        flag: "PH",
        type: VesselType.CARGO,
        status: VesselStatus.ACTIVE,
        latitude: 14.5995,
        longitude: 120.9842,
        heading: 90,
        speed: 12.3,
        course: 85,
        destination: "Kaohsiung",
        eta: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
        length: 168,
        width: 25,
        draft: 9.2,
        deadweight: 32000,
        voyageId: "LRNZ250789",
        owner: {
          company: "Lorenzo Shipping",
          contactName: "Ramon Cruz",
          contactEmail: "operations@lorenzoshipping.com.ph",
          phone: "+63 2 8527 8888",
          headquartersPort: "Manila, Philippines"
        }
      },
    ];

    vesselData.forEach((vessel) => {
      const id = randomUUID();
      const fullVessel: Vessel = {
        ...vessel,
        id,
        lastUpdate: new Date().toISOString(),
        eta: vessel.eta || null,
      };
      this.vessels.set(id, fullVessel);
      
      for (let i = 0; i < 10; i++) {
        const pointId = randomUUID();
        const routePoint: RoutePoint = {
          id: pointId,
          vesselId: id,
          latitude: vessel.latitude + (Math.random() - 0.5) * 2,
          longitude: vessel.longitude + (Math.random() - 0.5) * 2,
          speed: vessel.speed * (0.8 + Math.random() * 0.4),
          heading: vessel.heading + (Math.random() - 0.5) * 20,
          timestamp: new Date(Date.now() - i * 30 * 60 * 1000).toISOString(),
        };
        this.routePoints.set(pointId, routePoint);
      }
    });

    const alertData: { vesselId: string; vesselName: string; data: Omit<InsertVesselAlert, "vesselId" | "vesselName"> }[] = [];
    const vesselList = Array.from(this.vessels.values());
    
    if (vesselList.length > 0) {
      alertData.push({
        vesselId: vesselList[0].id,
        vesselName: vesselList[0].name,
        data: {
          type: AlertType.SPEED_ANOMALY,
          severity: AlertSeverity.WARNING,
          message: "Vessel speed exceeded normal operating range (>20 knots)",
        },
      });
    }
    
    if (vesselList.length > 1) {
      alertData.push({
        vesselId: vesselList[1].id,
        vesselName: vesselList[1].name,
        data: {
          type: AlertType.WEATHER_WARNING,
          severity: AlertSeverity.INFO,
          message: "Storm warning issued for current route area",
        },
      });
    }
    
    if (vesselList.length > 8) {
      alertData.push({
        vesselId: vesselList[8].id,
        vesselName: vesselList[8].name,
        data: {
          type: AlertType.ROUTE_DEVIATION,
          severity: AlertSeverity.CRITICAL,
          message: "Vessel has deviated from planned route by more than 10nm",
        },
      });
    }

    if (vesselList.length > 2) {
      alertData.push({
        vesselId: vesselList[2].id,
        vesselName: vesselList[2].name,
        data: {
          type: AlertType.PORT_ARRIVAL,
          severity: AlertSeverity.INFO,
          message: "Vessel approaching destination port, ETA in 2 hours",
        },
      });
    }

    alertData.forEach(({ vesselId, vesselName, data }) => {
      const id = randomUUID();
      const alert: VesselAlert = {
        id,
        vesselId,
        vesselName,
        type: data.type,
        severity: data.severity,
        message: data.message,
        timestamp: new Date(Date.now() - Math.random() * 60 * 60 * 1000).toISOString(),
        acknowledged: false,
        resolved: false,
      };
      this.alerts.set(id, alert);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getVessels(filter?: VesselFilter): Promise<Vessel[]> {
    let vessels = Array.from(this.vessels.values());
    
    if (filter?.status && filter.status.length > 0) {
      vessels = vessels.filter((v) => filter.status!.includes(v.status));
    }
    
    if (filter?.type && filter.type.length > 0) {
      vessels = vessels.filter((v) => filter.type!.includes(v.type));
    }
    
    if (filter?.search) {
      const search = filter.search.toLowerCase().trim();
      vessels = vessels.filter(
        (v) =>
          v.name.toLowerCase().includes(search) ||
          v.imo.toLowerCase() === search ||
          v.mmsi.toLowerCase() === search ||
          v.callSign.toLowerCase().includes(search) ||
          (v.destination && v.destination.toLowerCase().includes(search))
      );
    }
    
    return vessels;
  }

  async getVessel(id: string): Promise<Vessel | undefined> {
    return this.vessels.get(id);
  }

  async createVessel(insertVessel: InsertVessel): Promise<Vessel> {
    const id = randomUUID();
    const vessel: Vessel = {
      ...insertVessel,
      id,
      lastUpdate: new Date().toISOString(),
      eta: insertVessel.eta || null,
    };
    this.vessels.set(id, vessel);
    return vessel;
  }

  async updateVessel(id: string, updates: Partial<InsertVessel>): Promise<Vessel | undefined> {
    const vessel = this.vessels.get(id);
    if (!vessel) return undefined;
    
    const updatedVessel: Vessel = {
      ...vessel,
      ...updates,
      lastUpdate: new Date().toISOString(),
    };
    this.vessels.set(id, updatedVessel);
    return updatedVessel;
  }

  async deleteVessel(id: string): Promise<boolean> {
    return this.vessels.delete(id);
  }

  async getRouteHistory(vesselId: string): Promise<RoutePoint[]> {
    return Array.from(this.routePoints.values())
      .filter((p) => p.vesselId === vesselId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  async addRoutePoint(insertPoint: InsertRoutePoint): Promise<RoutePoint> {
    const id = randomUUID();
    const point: RoutePoint = {
      ...insertPoint,
      id,
      timestamp: new Date().toISOString(),
    };
    this.routePoints.set(id, point);
    return point;
  }

  async getAlerts(): Promise<VesselAlert[]> {
    return Array.from(this.alerts.values())
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  async getVesselAlerts(vesselId: string): Promise<VesselAlert[]> {
    return Array.from(this.alerts.values())
      .filter((a) => a.vesselId === vesselId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  async createAlert(insertAlert: InsertVesselAlert): Promise<VesselAlert> {
    const id = randomUUID();
    const alert: VesselAlert = {
      ...insertAlert,
      id,
      timestamp: new Date().toISOString(),
      acknowledged: false,
      resolved: false,
    };
    this.alerts.set(id, alert);
    return alert;
  }

  async acknowledgeAlert(id: string): Promise<VesselAlert | undefined> {
    const alert = this.alerts.get(id);
    if (!alert) return undefined;
    
    const updatedAlert: VesselAlert = {
      ...alert,
      acknowledged: true,
    };
    this.alerts.set(id, updatedAlert);
    return updatedAlert;
  }

  async resolveAlert(id: string): Promise<VesselAlert | undefined> {
    const alert = this.alerts.get(id);
    if (!alert) return undefined;
    
    const updatedAlert: VesselAlert = {
      ...alert,
      resolved: true,
    };
    this.alerts.set(id, updatedAlert);
    return updatedAlert;
  }

  async getFleetStats(): Promise<FleetStats> {
    const vessels = Array.from(this.vessels.values());
    const alerts = Array.from(this.alerts.values()).filter((a) => !a.resolved);
    
    const activeVessels = vessels.filter((v) => v.status === VesselStatus.ACTIVE).length;
    const anchoredVessels = vessels.filter((v) => v.status === VesselStatus.ANCHORED).length;
    const inPortVessels = vessels.filter((v) => v.status === VesselStatus.IN_PORT).length;
    const underwayVessels = vessels.filter((v) => v.status === VesselStatus.UNDERWAY).length;
    
    const totalSpeed = vessels.reduce((sum, v) => sum + v.speed, 0);
    const averageSpeed = vessels.length > 0 ? totalSpeed / vessels.length : 0;
    
    const criticalAlerts = alerts.filter((a) => a.severity === AlertSeverity.CRITICAL).length;
    
    return {
      totalVessels: vessels.length,
      activeVessels,
      anchoredVessels,
      inPortVessels,
      underwayVessels,
      averageSpeed,
      totalAlerts: alerts.length,
      criticalAlerts,
    };
  }
}

export const storage = new MemStorage();
