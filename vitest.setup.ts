import { vi } from "vitest";
import axios from "axios";

vi.mock("axios");
const axiosMock = vi.mocked(axios, true);
(globalThis as any).axiosMock = axiosMock;

import "@testing-library/jest-dom";
