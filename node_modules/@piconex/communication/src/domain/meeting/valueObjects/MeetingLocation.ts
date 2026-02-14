export type MeetingLocation = PhysicalLocation | VirtualLocation;

export class PhysicalLocation {
  readonly type = "physical";

  constructor(private readonly name: string) {
    if (!name || name.trim().length === 0) {
      throw new Error("Physical location name cannot be empty");
    }
  }

  getName() {
    return this.name;
  }
}

export class VirtualLocation {
  readonly type = "virtual";

  constructor(private readonly meetingUrl: string) {
    if (!meetingUrl || meetingUrl.trim().length === 0) {
      throw new Error("Meeting URL cannot be empty");
    }

    try {
      new URL(meetingUrl);
    } catch {
      throw new Error("Invalid meeting URL");
    }
  }

  getMeetingUrl() {
    return this.meetingUrl;
  }
}
