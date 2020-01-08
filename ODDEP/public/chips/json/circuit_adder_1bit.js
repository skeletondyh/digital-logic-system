var circuit_adder_1bit = [
  {
    "type": "draw2d_circuit_switch_HighLow",
    "id": "0812e1cb-9408-e884-0ad6-21afd67dec00",
    "x": 87,
    "y": 103,
    "width": 42,
    "height": 43.5,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "draw2d_circuit_switch_HighLow",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "draw2d_circuit_switch_HighLow",
    "id": "bd35fc8c-eb03-3cce-9268-00b63fa8dce7",
    "x": 87,
    "y": 170,
    "width": 42,
    "height": 43.5,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "draw2d_circuit_switch_HighLow",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "draw2d_circuit_display_Led",
    "id": "84a1329b-06d6-3faf-83e2-38f5a1d705f8",
    "x": 786,
    "y": 57,
    "width": 30,
    "height": 32,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "draw2d_circuit_display_Led",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "draw2d_circuit_display_Led",
    "id": "5cf5a8f0-c001-92d6-6b8b-c21720bd5cdd",
    "x": 786,
    "y": 176,
    "width": 30,
    "height": 32,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "draw2d_circuit_display_Led",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "C74LS86",
    "id": "6e31cea8-6bcc-4ae0-81b0-282205429102",
    "x": 360,
    "y": 47,
    "width": 219,
    "height": 116,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "C74LS86",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "C74LS00",
    "id": "8be4d659-45b0-ae2e-128d-8f2e1d0b0c73",
    "x": 250,
    "y": 218,
    "width": 219,
    "height": 116,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "C74LS00",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "C74LS04",
    "id": "96bf610e-f66a-18f4-be3a-2cb10b067d72",
    "x": 508,
    "y": 228,
    "width": 219,
    "height": 116,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "C74LS04",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "Connection",
    "id": "5f81d49b-5f2c-3dc9-8953-055dad3ce3af",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "Connection",
    "stroke": 1.5,
    "color": "#000000",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "ConnectionSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 355,
        "y": 239
      },
      {
        "x": 355,
        "y": 219
      },
      {
        "x": 563,
        "y": 219
      },
      {
        "x": 563,
        "y": 249
      }
    ],
    "router": "ConnectionRouter",
    "radius": 2,
    "routingMetaData": {
      "routedByUserInteraction": false,
      "fromDir": 0,
      "toDir": 0
    },
    "source": {
      "node": "8be4d659-45b0-ae2e-128d-8f2e1d0b0c73",
      "port": "port11"
    },
    "target": {
      "node": "96bf610e-f66a-18f4-be3a-2cb10b067d72",
      "port": "port13"
    },
    "labels": []
  },
  {
    "type": "Connection",
    "id": "2dc00081-2955-e2dd-7038-0ab6d9ffff93",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "Connection",
    "stroke": 1.5,
    "color": "#000000",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "ConnectionSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 128.5,
        "y": 125.5
      },
      {
        "x": 330,
        "y": 125.5
      },
      {
        "x": 330,
        "y": 239
      }
    ],
    "router": "ConnectionRouter",
    "radius": 2,
    "routingMetaData": {
      "routedByUserInteraction": false,
      "fromDir": 1,
      "toDir": 0
    },
    "source": {
      "node": "0812e1cb-9408-e884-0ad6-21afd67dec00",
      "port": "Port"
    },
    "target": {
      "node": "8be4d659-45b0-ae2e-128d-8f2e1d0b0c73",
      "port": "port12"
    },
    "labels": []
  },
  {
    "type": "Connection",
    "id": "7a2ada06-ed11-8dba-3bf5-33e6628fcf6e",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "Connection",
    "stroke": 1.5,
    "color": "#000000",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "ConnectionSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 128.5,
        "y": 192.5
      },
      {
        "x": 305,
        "y": 192.5
      },
      {
        "x": 305,
        "y": 239
      }
    ],
    "router": "ConnectionRouter",
    "radius": 2,
    "routingMetaData": {
      "routedByUserInteraction": false,
      "fromDir": 1,
      "toDir": 0
    },
    "source": {
      "node": "bd35fc8c-eb03-3cce-9268-00b63fa8dce7",
      "port": "Port"
    },
    "target": {
      "node": "8be4d659-45b0-ae2e-128d-8f2e1d0b0c73",
      "port": "port13"
    },
    "labels": []
  },
  {
    "type": "Connection",
    "id": "fa0808b3-8021-3874-c4b7-bc3133211f5d",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "Connection",
    "stroke": 1.5,
    "color": "#000000",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "ConnectionSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 128.5,
        "y": 192.5
      },
      {
        "x": 271.75,
        "y": 192.5
      },
      {
        "x": 271.75,
        "y": 48
      },
      {
        "x": 415,
        "y": 48
      },
      {
        "x": 415,
        "y": 68
      }
    ],
    "router": "ConnectionRouter",
    "radius": 2,
    "routingMetaData": {
      "routedByUserInteraction": false,
      "fromDir": 1,
      "toDir": 0
    },
    "source": {
      "node": "bd35fc8c-eb03-3cce-9268-00b63fa8dce7",
      "port": "Port"
    },
    "target": {
      "node": "6e31cea8-6bcc-4ae0-81b0-282205429102",
      "port": "port13"
    },
    "labels": []
  },
  {
    "type": "Connection",
    "id": "6fbf06b5-368a-ef8f-0e1c-a4a4e0ba791b",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "Connection",
    "stroke": 1.5,
    "color": "#000000",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "ConnectionSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 128.5,
        "y": 125.5
      },
      {
        "x": 212.25,
        "y": 125.5
      },
      {
        "x": 212.25,
        "y": 25
      },
      {
        "x": 440,
        "y": 25
      },
      {
        "x": 440,
        "y": 68
      }
    ],
    "router": "ConnectionRouter",
    "radius": 2,
    "routingMetaData": {
      "routedByUserInteraction": true,
      "fromDir": 1,
      "toDir": 0
    },
    "source": {
      "node": "0812e1cb-9408-e884-0ad6-21afd67dec00",
      "port": "Port"
    },
    "target": {
      "node": "6e31cea8-6bcc-4ae0-81b0-282205429102",
      "port": "port12"
    },
    "labels": []
  },
  {
    "type": "Connection",
    "id": "e6621f98-6514-9191-a100-63bc885b5c48",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "Connection",
    "stroke": 1.5,
    "color": "#000000",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "ConnectionSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 465,
        "y": 68
      },
      {
        "x": 465,
        "y": 48
      },
      {
        "x": 625,
        "y": 48
      },
      {
        "x": 625,
        "y": 73.5
      },
      {
        "x": 785,
        "y": 73.5
      }
    ],
    "router": "ConnectionRouter",
    "radius": 2,
    "routingMetaData": {
      "routedByUserInteraction": false,
      "fromDir": 0,
      "toDir": 3
    },
    "source": {
      "node": "6e31cea8-6bcc-4ae0-81b0-282205429102",
      "port": "port11"
    },
    "target": {
      "node": "84a1329b-06d6-3faf-83e2-38f5a1d705f8",
      "port": "Port"
    },
    "labels": []
  },
  {
    "type": "Connection",
    "id": "350de7ce-26ed-09be-e143-3243a5529e19",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "Connection",
    "stroke": 1.5,
    "color": "#000000",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "ConnectionSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 588,
        "y": 249
      },
      {
        "x": 588,
        "y": 192.5
      },
      {
        "x": 785,
        "y": 192.5
      }
    ],
    "router": "ConnectionRouter",
    "radius": 2,
    "routingMetaData": {
      "routedByUserInteraction": false,
      "fromDir": 0,
      "toDir": 3
    },
    "source": {
      "node": "96bf610e-f66a-18f4-be3a-2cb10b067d72",
      "port": "port12"
    },
    "target": {
      "node": "5cf5a8f0-c001-92d6-6b8b-c21720bd5cdd",
      "port": "Port"
    },
    "labels": []
  }
];