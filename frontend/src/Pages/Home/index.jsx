import { useSDK } from '@metamask/sdk-react';
import React, { useState, Component, useLayoutEffect,useRef } from 'react';
import styles from "./index.module.css";
// import * as am5 from "@amcharts/amcharts5";
// import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
// import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { ForceGraph2D} from 'react-force-graph';

const Home = () => {
  const fgRef = useRef();
  const [account, setAccount] = useState("");
  const { sdk, connected, chainId } = useSDK();
  // useLayoutEffect(() => {
  //   let root = am5.Root.new("chartdiv");
  //   root.setThemes([am5themes_Animated.new(root)]);
  //   var container = root.container.children.push(
  //     am5.Container.new(root, {
  //       width: am5.percent(50),
  //       height: am5.percent(100),
  //       layout: root.verticalLayout
  //     })
  //   );
  //   var series = container.children.push(
  //     am5hierarchy.ForceDirected.new(root, {
  //       downDepth: 1,
  //       initialDepth: 2,
  //       topDepth: 1,
  //       valueField: "value",
  //       categoryField: "name",
  //       childDataField: "children",
  //       minRadius: am5.percent(5),
  //       manyBodyStrength: -30,
  //       nodePadding: 10
  //     })
  //   );

  //   series.outerCircles.template.states.create("hoverdisabled", {
  //     fillOpacity: 0.5,
  //     strokeOpacity: 0,
  //     strokeDasharray: 0
  //   });

  //   series.nodes.template.setAll({
  //     draggable: false,
  //     brightness: 0.8,
  //     // filter: "drop-shadow(0px 0px 20px #8a46ff)"
  //   });

  //   series.data.setAll([{
  //     name: "Root",
  //     value: 0,
  //     children: [{
  //       name: "User1",
  //       children: [{
  //         name: "Node1",
  //         value: 23
  //       }, {
  //         name: "Node1",
  //         value: 27
  //       }, {
  //         name: "Node1",
  //         value: 29
  //       }
  //       ]
  //     }, {
  //       name: "User2",
  //       children: [{
  //         name: "Node2",
  //         value: 23
  //       }, {
  //         name: "Node2",
  //         value: 27
  //       }
  //       ]
  //     }, {
  //       name: "User3",
  //       children: [{
  //         name: "Node3",
  //         value: 23
  //       }, {
  //         name: "Node3",
  //         value: 27
  //       }, {
  //         name: "Node3",
  //         value: 29
  //       }, {
  //         name: "Node3",
  //         value: 89
  //       }
  //       ]
  //     }]
  //   }]);
  //   series.set("selectedDataItem", series.dataItems[0]);
  //   root.current = root;

  //   return () => {
  //     root.dispose();
  //   };
  // }, [])

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };

  const useForceUpdate = () => {
    const setToggle = useState(false)[1];
    return () => setToggle(b => !b);
  };

  const forceUpdate = useForceUpdate();

  return (
    <div className="App">
      {/* <button style={{ padding: 10, margin: 10 }} onClick={connect}>
        Connect
      </button>
      {connected && (
        <div>
          <>
            {chainId && `Connected chain: ${chainId}`}
            <p></p>
            {account && `Connected account: ${account}`}
          </>
        </div>
      )} */}
      <div id="chartdiv" className={styles.canvas}>
        <ForceGraph2D
         ref={fgRef}
         linkColor={() => 'rgba(255,255,255,0.3)'}
         nodeColor={() => '#8a46ff'}
         backgroundColor='#191b35'
         linkDirectionalParticles={1}
         linkDirectionalParticleColor={() => '#8a46ff'}
         nodeRelSize={5}
          graphData={{
            nodes: [
              { id: "1" },
              { id: "2" },
              { id: "3" },
              { id: "4" },
              { id: "5" },
              { id: "6" },
              { id: "7" },
              { id: "8" },
              { id: "9" },
              { id: "10" },
              { id: "11" },
              { id: "12" },
              { id: "13" },
              { id: "14" },
              { id: "15" },
              { id: "16" },
              { id: "17" },
              { id: "18" },
              { id: "19" },
              { id: "20" },
              { id: "21" },
              { id: "22" },
              { id: "23" },
              { id: "24" },
              { id: "25" },
              { id: "26" },
              { id: "27" },
            ],
            links: [
              { source: "1", target: "2" },
              { source: "1", target: "3" },
              { source: "1", target: "4" },
              { source: "5", target: "6" },
              { source: "5", target: "7" },
              { source: "5", target: "8" },
              { source: "5", target: "9" },
              { source: "5", target: "10" },
              { source: "11", target: "12" },
              { source: "11", target: "13" },
              { source: "11", target: "14" },
              { source: "11", target: "15" },
              { source: "16", target: "17" },
              { source: "16", target: "18" },
              { source: "16", target: "19" },
              { source: "16", target: "20" },
              { source: "21", target: "22" },
              { source: "21", target: "23" },
              { source: "24", target: "25" },
              { source: "24", target: "26" },
              { source: "24", target: "27" },
            ],
          }}
        />
      </div>
      <div className={styles.title}>
        <h1>Flock</h1>
      </div>
    </div>
  );
};

export default Home;