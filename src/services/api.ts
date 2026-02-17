import type { Person } from "../models/types";
import { seedPeople } from "../data/seed";
import { API_DELAY } from "../constants";

// Mock API service that simulates network delay and potential errors
export class ApiService {
  private static readonly DELAY = API_DELAY; // 200ms delay for better UX
  private static forceError = false;

  static setForceError(force: boolean) {
    this.forceError = force;
  }

  static async fetchPeople(): Promise<Person[]> {
    console.log("API fetchPeople called, forceError:", ApiService.forceError);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, ApiService.DELAY));
    
    // Force error if requested, or simulate occasional API errors (10% chance)
    if (ApiService.forceError || Math.random() < 0.1) {
      console.log("API throwing error");
      throw new Error("Failed to fetch people data from API");
    }
    
    console.log("API returning data");
    // Return a copy of seed data to simulate API response
    return [...seedPeople];
  }

  static async updatePerson(personId: string, updates: Partial<Person>): Promise<Person> {
    await new Promise(resolve => setTimeout(resolve, ApiService.DELAY));
    
    const person = seedPeople.find(p => p.id === personId);
    if (!person) {
      throw new Error(`Person with id ${personId} not found`);
    }
    
    return { ...person, ...updates };
  }
}
