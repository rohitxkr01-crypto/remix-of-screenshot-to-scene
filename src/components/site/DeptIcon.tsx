import { Bone, Brain, BrainCircuit, HeartPulse, Hospital, Microscope, MonitorCheck, ScanLine, type LucideProps } from "lucide-react";
import type { DepartmentIcon } from "@/content/site";

const map = {
  brain: Brain,
  "brain-circuit": BrainCircuit,
  bone: Bone,
  "heart-pulse": HeartPulse,
  "monitor-check": MonitorCheck,
  hospital: Hospital,
  "scan-line": ScanLine,
  microscope: Microscope,
} as const;

export function DeptIcon({ name, ...props }: { name: DepartmentIcon } & LucideProps) {
  const Icon = map[name];
  return <Icon aria-hidden="true" {...props} />;
}
